# ESL-L1-question-targeting
GT OMSCS CS6460 Educational Technology Project: ESL Reading Comprehension Question Interface with L1 Targeting. For more context on the purpose and design of this project, see the full proposal here: https://drive.google.com/file/d/1D6FmIAyxu0lAiTcQVQZiAyAmF0SqHFsV/view?usp=sharing

## Architecture
Architecture is broken into two components: Web UI front end hosted with Google Cloud Platform (GCP) App Engine, and a backend API hosted with GCP Cloud Run. Both components are written in Python Flask
![Architecture Diagram](architecture-diagram.PNG)

## To deploy the API code in GCP Cloud Run
[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/byramag/esl-question-generator)

## Standard Question Data
20 sample data files under the path ./data sourced from https://www.myenglishpages.com/site_php_files/reading.php

These reading comprehension passages are relatively short and at a beginner/intermediate reading level and cover a wide range of context domains. The sample passages from the source website contain some human created questions which can be used as the returned questions.

The larger set of data is directed for higher question difficulty and longer passages. This large dataset is the Stanford NLP group's SQuAD 2.0 dataset and can be found here: https://rajpurkar.github.io/SQuAD-explorer/

### Discussion on Question Generation
The question generation functionality was intended to be implemented using a pre-trained model from https://github.com/PaddlePaddle/ERNIE This model was chosen as it is ranked highest in BLEU 4 score on the SQuAD dataset according to https://paperswithcode.com/sota/question-generation-on-squad11. This model is also appropriate as it provides the pre-trained model and the library to interface with it, which will allow for ease of integration.

However, several delays were encountered when trying to implement the use of this and other pretrained models, which led to the decision to reduce scope of this project from dynamic question generation given any input text to the use of large static datasets. Dynamic question generation will remain a future goal to be implemented at a later stage (but not associated with the deliverable for CS6460).

