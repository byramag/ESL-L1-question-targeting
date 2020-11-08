# Dockerfile
FROM python:3.7-stretch
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt

# # Multi language Spacy models
# RUN python -m spacy download zh_core_web_md
# RUN python -m spacy download en_core_web_md
# RUN python -m spacy download fr_core_news_md
# RUN python -m spacy download ja_core_news_md
# RUN python -m spacy download es_core_news_md

ENTRYPOINT ["python"]
CMD ["question_api.py"]