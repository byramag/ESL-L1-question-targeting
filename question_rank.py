import json
from googletrans import Translator
import spacy
import re
import random
import time

class QuestionRanker():
    lang_map = {
        'chinese': {
            'model': 'zh_core_web_md',
            'abbrev': 'zh-cn'
        },
        'french': {
            'model': 'fr_core_news_md',
            'abbrev': 'fr'
        },
        'japanese': {
            'model': 'ja_core_news_md',
            'abbrev': 'ja'
        },
        'spanish': {
            'model': 'es_core_news_md',
            'abbrev': 'es'
        },
    }

    def __init__(self, l1):
        self.l1 = l1.lower()
        assert self.l1 in self.lang_map.keys()

        self.translator = Translator(service_urls=['translate.googleapis.com'])
        self.en_model, self.l1_model = self.load_lang_models(self.l1)
    
    def load_lang_models(self, lang):
        en_model = spacy.load("en_core_web_md")
        l1_model = spacy.load(self.lang_map[lang]['model'])
        return en_model, l1_model
    
    def swap_l1(self, new_l1):
        if new_l1.lower() not in self.lang_map.keys():
            print(f"Attempted L1 set to {new_l1}, but failed because invalid")
            raise ValueError
        self.l1 = new_l1.lower()
        self.l1_model = spacy.load(self.lang_map[self.l1]['model'])
    
    def translate(self, text, src='en', dest=None):
        if not dest:
            dest = self.lang_map[self.l1]['abbrev']
        # print(f"translating text {text} from {src} to {dest}")
        translated = ""
        counter = 0
        while not translated and counter < 10:
            try:
                translated = self.translator.translate(
                    text, 
                    src=src, 
                    dest=dest
                ).text
            except Exception as e:
                counter += 1
                print(e)
                time.sleep(0.5)
                self.translator = Translator(service_urls=['translate.googleapis.com'])
        return translated

    def rank(self, questions):
        context_scores = []
        question_scores = []
        distractors = [] 
        i = 0
        for paragraph in questions:
            en_context_doc = self.en_model(paragraph['context'])
            l1_context_doc = self.l1_model(self.translate(paragraph['context']))
            distractors.append(self.get_distractors(en_context_doc))
            sent_scores = []
            for en_sent, l1_sent in zip(en_context_doc.sents, l1_context_doc.sents):
                sent_scores.append([
                    self.contrastive_word_order(en_sent, l1_sent),
                    self.contrastive_sem_sim(en_sent, l1_sent),
                    self.contrastive_verb_analysis(en_sent, l1_sent),
                    self.contrastive_dependency_parse(en_sent, l1_sent),
                    # self.contrastive_ner(en_sent, l1_sent)
                ])
            if not sent_scores:
                return self.build_response(questions, [[0]], [[0]])
            sent_score_avgs = []
            for feature in range(len(sent_scores[0])): # for each feature
                feature_total = 0
                for j in range(len(sent_scores)): # sum feature from each sentence
                    feature_total += sent_scores[j][feature]
                sent_score_avgs.append(feature_total/len(sent_scores))
            context_scores.append(sent_score_avgs)
            question_scores.append([])
            for question in paragraph['qas']:
                en_question_doc = self.en_model(question['question'])
                l1_question_doc = self.l1_model(self.translate(question['question']))
                question_scores[i].append([
                    self.contrastive_word_order(en_question_doc, l1_question_doc),
                    self.contrastive_sem_sim(en_question_doc, l1_question_doc),
                    self.contrastive_verb_analysis(en_question_doc, l1_question_doc),
                    self.contrastive_dependency_parse(en_question_doc, l1_question_doc),
                    # self.contrastive_ner(en_question_doc, l1_question_doc)
                ])
            i += 1
        ranked_question_obj = self.build_response(questions, context_scores, question_scores, distractors)
        print(f"last q after build response is {ranked_question_obj[-1]['question']}")
        return ranked_question_obj

    def get_distractors(self, context_doc):
        dist = []
        dist = [ent.text for ent in context_doc.ents]
        if len(dist) < 5:
            dist = [token.text for token in context_doc if token.pos_ in ['PROPN', 'NUM']]
        if len(dist) < 5:
            dist += [token.text for token in context_doc if token.pos_ in ['NOUN']]
        return list(set(dist))
    
    def build_response(self, questions, context_scores, question_scores, distractors):
        full_passage = ""
        reformatted_qs = []
        i,j = 0,0
        for para in questions:
            full_passage += para['context'] + '\n'
            for q in para['qas']:
                if not q['is_impossible']:
                    # print(f"question {q['question']} answer {q['answers'][0]}")
                    # print(f"indices i {i} j {j}")
                    random.shuffle(distractors[i])
                    if q['answers'][0]['text'] in distractors[i][:3]: # make sure distractor is not real answer
                        distractors[i][ distractors[i].index( q['answers'][0]['text'] ) ] = "Nothing"
                    question_response = {
                        "context": para['context'],
                        "question": q['question'],
                        "answer": q['answers'][0]['text'],
                        "answer_index": q['answers'][0]['answer_start'],
                        "distractors": distractors[i][:3],
                        "context_scores": context_scores[i],
                        "question_scores": question_scores[i][j]
                    }
                    reformatted_qs.append(question_response)
                j += 1
            i += 1
            j = 0
        reformatted_qs = self.order_by_scores(reformatted_qs)
        print(f"last q after order by is {reformatted_qs[-1]['question']}")
        return reformatted_qs
    
    def get_feature_text(self, scores):
        all_scores = scores["context_scores"] + scores["question_scores"]
        all_scores = [0 if score == 1 else score for score in all_scores]
        top_score = max(all_scores)
        top_index = all_scores.index(top_score) + 1

        if top_index % 4 == 0 : feature_text, feature_desc = "SVO ordering", "high-level sentence structure"
        elif top_index % 4 == 1 : feature_text, feature_desc = "part-of-speech word ordering", "low-level sentence structure"
        elif top_index % 4 == 2 : feature_text, feature_desc = "semantic similarity", "word meanings"
        else : feature_text, feature_desc = "verb form analysis", "verb conjugation"
        feature_of = "context" if top_index < 4 else "question"

        return feature_text, feature_of, top_score, feature_desc

    def get_metadata(self, question_info, score):
        feature_text, where_feature, highest_score, feature_implication = self.get_feature_text(question_info)
        if score > 0.8 : contrastive_level = "very high"
        elif score > 0.6 : contrastive_level = "somewhat high"
        elif score > 0.4 : contrastive_level = "moderate"
        elif score > 0.2 : contrastive_level = "somewhat low"
        else : contrastive_level = "low"
        score_message = f"""
            This question recieved a total contrastive score of {int(score*100)}%. This score is considered a {contrastive_level} level of contrast between English and your native language within the question and context.
            The most contrastive feature was {feature_text} within the {where_feature} with a score of {int(highest_score*100)}%, so the skill that may be more difficult for you in answering this question is {feature_implication}.
        """
        metadata = {
            "context_scores": question_info["context_scores"],
            "question_scores": question_info["question_scores"],
            "contrastive_score": score,
            "explanation": score_message
        }
        return metadata
        
    def order_by_scores(self, questions):
        print(f"before reordering {questions}")
        contrastive_scores = []
        for q in questions:
            context_avg = sum(q['context_scores'])/len(q['context_scores'])
            question_avg = sum(q['question_scores'])/len(q['question_scores'])
            contrastive_scores.append((context_avg + question_avg) / 2)
        # print(f"all scores {contrastive_scores}")
        ordered_questions = []
        for i in range(len(contrastive_scores)):
            max_q_index = contrastive_scores.index(max(contrastive_scores))
            
            question_object = questions[max_q_index]
            question_object['ranking_metadata'] = self.get_metadata(
                question_object, 
                contrastive_scores[max_q_index]
            )
            del question_object['context_scores']
            del question_object['question_scores']
            ordered_questions.append(question_object)

            contrastive_scores[max_q_index] = 0
        print(f"after reordering {ordered_questions}")
        return ordered_questions
    
    def contrastive_word_order(self, en_doc, l1_doc):
        # return contrastive score (high number => high contrast, 0 => equality)
        en_pos = [token.pos_ for token in en_doc if not token.pos_ in ['PUNCT', 'DET']]
        l1_pos = [token.pos_ for token in l1_doc if not token.pos_ in ['PUNCT', 'DET']]
        # print(en_doc)
        # print(f"en pos {en_pos}")
        # print(l1_doc)
        # print(f"l1 pos {l1_pos}")
        # handle different lengths
        l1_pos = l1_pos[:len(en_pos)]
        en_pos = en_pos[:len(l1_pos)]
            
        diffs = [1 for l1, en in zip(l1_pos, en_pos) if l1 == en]
        try: # TODO when and why would len(l1_pos) == 0?
            ca_score = 1 - (sum(diffs) / len(l1_pos))
        except ZeroDivisionError as e:
            ca_score = 0
        return ca_score

    def contrastive_sem_sim(self, en_doc, l1_doc):
        sim = en_doc.similarity(l1_doc)

        # Normalize sim contrastive score to be in range 0-1
        sim = 1 - ((sim - (-1)) / (1 - (-1)))
        # print(f"en->l1 sim = {en_doc.similarity(l1_doc)}")
        return sim

    def contrastive_verb_analysis(self, en_doc, l1_doc):
        en_verb_sim, l1_verb_sim = 0, 0
        # get en verb and lemma similarity
        for token in en_doc:
            if token.pos_ == 'VERB':
                en_verb_sim = token.similarity(self.en_model(token.lemma_))
        # get l1 verb and lemma similarity
        for token in l1_doc:
            if token.pos_ == 'VERB':
                l1_verb_sim = token.similarity(self.l1_model(token.lemma_))
        return abs(l1_verb_sim - en_verb_sim) / 2

    def contrastive_dependency_parse(self, en_doc, l1_doc):
        en_svo_positions = [-1,-1,-1]
        l1_svo_positions = [-1,-1,-1]
        # get distances between subj/obj/root
        i, j = 0, 0
        for token in en_doc:
            if token.dep_.upper() == 'ROOT':
                en_svo_positions[0] = i
            elif token.dep_.upper() in ['SUBJ', 'NSUBJ']:
                en_svo_positions[1] = i
            elif token.dep_.upper() in ['OBJ', 'DOBJ']:
                en_svo_positions[2] = i
            i += 1
        for token in l1_doc:
            if token.dep_.upper() == 'ROOT':
                l1_svo_positions[0] = j
            elif token.dep_.upper() in ['SUBJ', 'NSUBJ']:
                l1_svo_positions[1] = j
            elif token.dep_.upper() in ['OBJ', 'DOBJ']:
                l1_svo_positions[2] = j
            j += 1
        diffs = [
            abs(en_svo_positions[0] - l1_svo_positions[0]),
            abs(en_svo_positions[1] - l1_svo_positions[1]),
            abs(en_svo_positions[2] - l1_svo_positions[2])
        ]
        return (sum(diffs)/3) / len(en_doc)

    def contrastive_ner(self, en_doc, l1_doc):
        num_matched_ents = 0
        en_ent_labels = []
        for en_ent in en_doc.ents:
            en_ent_labels.append(en_ent.label_)
        for l1_ent in l1_doc.ents:
            if l1_ent.label_ in en_ent_labels:
                num_matched_ents += 1
        print(f"ner en labels {en_ent_labels} match total {num_matched_ents}")
        if en_ent_labels:
            return num_matched_ents / len(en_ent_labels)
        return 0

if __name__ == "__main__":
    ranker = QuestionRanker('chinese')
    with open('data/squad_small.json') as question_file:
        questions = json.load(question_file)
    
    immune_system = []
    for topic in questions['data']:
        if topic['title'] == 'Immune_system':
            immune_system = topic['paragraphs']
    # print(immune_system)
    immune_system = immune_system[:2]

    print('starting rank')
    ranked = ranker.rank(immune_system)
    with open('out.json', 'w') as outfile:
        json.dump(outfile)
    # print(ranked)
