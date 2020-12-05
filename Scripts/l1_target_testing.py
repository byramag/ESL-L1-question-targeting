from googletrans import Translator
import spacy

lang_map = {
    'chinese': {
        'model': 'zh_core_web_md',
        'abbrev': 'zh-ch'
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

def load_lang_models(lang):
    en_model = spacy.load("en_core_web_md")
    l1_model = spacy.load(lang_map[lang]['model'])
    return en_model, l1_model

def contrastive_word_order(en_doc, l1_doc):
    ca_scores = []
    for en_sent, l1_sent in zip(en_doc.sents, l1_doc.sents):
        print(f"EN sent: {en_sent}")
        print(f"L1 sent: {l1_sent}")
        # TODO check pos per token esp verb placement
        ca_score = 1
        ca_scores.append(ca_score)
    # return contrastive score (high number => high contrast, 0 => equality)
    return sum(ca_scores) / len(ca_scores) # average contrastive score across sentences

def contrasitve_sem_sim(en_doc, l1_doc):
    print("TODO")
    return 1

def contrasitve_verb_analysis(en_doc, l1_doc):
    print("TODO")
    return 1

def main(l1):

    l1 = l1.lower()
    assert l1 in lang_map.keys()

    translator = Translator()
    print("Translator created")

    input_text = "你怎么样？"
    paragraph = """
    The immune system is a system of many biological structures and processes within an organism that protects against disease. To function properly, an immune system must detect a wide variety of agents, known as pathogens, from viruses to parasitic worms, and distinguish them from the organism's own healthy tissue. In many species, the immune system can be classified into subsystems, such as the innate immune system versus the adaptive immune system, or humoral immunity versus cell-mediated immunity. In humans, the blood–brain barrier, blood–cerebrospinal fluid barrier, and similar fluid–brain barriers separate the peripheral immune system from the neuroimmune system which protects the brain.
    """

    paragraph_l1 = translator.translate(paragraph, src='en', dest=lang_map[l1]['abbrev']).text
    print(f"translated {paragraph_l1}")

    en_model, l1_model = load_lang_models(l1)
    en_doc = en_model(paragraph)
    l1_doc = l1_model(paragraph_l1)

    score = contrastive_word_order(en_doc, l1_doc)
    print(score)


if __name__ == "__main__":
    main('spanish')