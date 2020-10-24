#main.py
import json, re, os
from flask import Flask, jsonify, request, abort

app = Flask(__name__)

def l1_target_filter(questions_obj, l1_target=None):
    if l1_target:
        print("TODO: questions ranking here")
    all_questions = []
    for para in questions_obj:
        all_questions += para['qas']
    return all_questions

@app.errorhandler(404)
def title_not_found(e):
    return jsonify(error=str(e)), 404

@app.route('/health')
def health_check():
    return "API is healthy"

@app.route('/passages')
def get_passage_list():
    passage_titles = [
        passage['title']
        for passage
        in questions['data']
    ]
    return jsonify(passage_titles)

@app.route('/passage', methods=['POST'])
def get_passage():
    request_json = request.get_json()
    title = request_json['Title']
    num_paragraphs = request_json['NumParagraphs']
    passage = None
    print(f"title is {title}")
    for passage_obj in questions['data']:
        if passage_obj['title'] == title:
            passage = [paragraph['context'] for paragraph in passage_obj['paragraphs']]
    if not passage:
        abort(404, description=f'No title matching {title} found')
    if num_paragraphs:
        return jsonify(passage[:num_paragraphs])
    return jsonify(passage)

@app.route('/questions', methods=['POST'])
def get_questions():
    request_json = request.get_json()
    title = request_json['Title']
    num_paragraphs = request_json['NumParagraphs']
    num_questions = request_json['NumQuestions']
    l1_target = request_json['L1Target']
    print(f"title is {title}")
    all_questions = None
    for passage_obj in questions['data']:
        if passage_obj['title'] == title:
            all_questions = passage_obj['paragraphs']
    if not all_questions:
        abort(404, description=f'No title matching {title} found')

    if num_paragraphs: all_questions = all_questions[:num_paragraphs]
    passage = [paragraph['context'] for paragraph in all_questions]

    # Main logic for ranking by L1 input
    filtered_questions = l1_target_filter(all_questions, l1_target)
    if num_questions: filtered_questions = filtered_questions[:num_questions]

    return jsonify({
        "Passage": passage,
        "Questions": filtered_questions
    })

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    global questions
    with open('data/squad_small.json') as question_file:
        questions = json.load(question_file)
    
    app.run(threaded=True, host='0.0.0.0', port=port)
