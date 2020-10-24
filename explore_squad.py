import json

def read_squad(path):
    with open(path, 'r') as squad_file:
        squad = json.load(squad_file)
    return squad['data']

if __name__ == "__main__":
    squad = read_squad('data/squad_large.json')

    print(f"squad num passages: {len(squad)}")

    # with open('beyonce.json', 'w') as outfile:
    #     json.dump(squad[0], outfile)
    
    para_counts = []
    for passage_obj in squad:
        passage = [paragraph['context'] for paragraph in passage_obj['paragraphs']]
        para_counts.append(len(passage))
    # print(para_counts)

    print(f"Average para length {sum(para_counts)/len(para_counts)}")
    print(f"Min {min(para_counts)}")
    print(f"Max {max(para_counts)}")

    total_questions = 0
    for passage_obj in squad:
        for para in passage_obj['paragraphs']:
            total_questions += len(para['qas'])
    print(f"Total questions: {total_questions}")
