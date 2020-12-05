import os

# Get Python Dependencies in Requirements
os.system("pip3 install --user -r requirements.txt")

# Download spaCy language models
os.system("python -m spacy download zh_core_web_md")
os.system("python -m spacy download en_core_web_md")
os.system("python -m spacy download fr_core_news_md")
os.system("python -m spacy download ja_core_news_md")
os.system("python -m spacy download es_core_news_md")