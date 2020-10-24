# esl-question-generator
GT OMSCS CS6460 Educational Technology Project: Automatic Reading Comprehension Question Generation with L1 Targeting

### Question Generation Model: ERNIE
The question generation functionality is implemented using a pre-trained model from https://github.com/PaddlePaddle/ERNIE

This model was chosen as it is ranked highest in BLEU 4 score on the SQuAD dataset according to https://paperswithcode.com/sota/question-generation-on-squad11. This model is also appropriate as it provides the pre-trained model and the library to interface with it, which will allow for ease of integration.

#### How to run demo question generation:
First:
```python -m paddle.distributed.launch --log_dir .\log  ./demo/seq2seq/finetune_seq2seq_dygraph.py --from_pretrained ernie-gen-base-en --data_dir ./data/cnndm --save_dir ./model_cnndm --label_smooth 0.1 --use_random_noice --noise_prob 0.7 --predict_output_dir ./pred --max_steps $((287113*30/64)) ```

Next:
```type ..\data\input_passages\brain_drain.txt| python demo/seq2seq/decode.py --from_pretrained ..\model-ernie-gen-large-en.1 --save_dir ..\model_cnndm --bsz 8```

#### Potenital notebook tutorials for usage:
https://aistudio.baidu.com/aistudio/projectdetail/873829

https://aistudio.baidu.com/aistudio/projectdetail/986520

https://aistudio.baidu.com/aistudio/projectdetail/433491

### Sample Data
20 sample data files under the path ./data sourced from https://www.myenglishpages.com/site_php_files/reading.php

These reading comprehension passages are relatively short and at a beginner/intermediate reading level and cover a wide range of context domains. The sample passages from the source website contain some human created questions which can be used as a comparison tool for the generated questions.

More test data will be added as needed to test performance on for higher difficulty and longer passages. Future work: robust testing using Stanford NLP groups SQuAD 1.1 dataset: https://rajpurkar.github.io/SQuAD-explorer/explore/1.1/dev/ 

## To run code in GCP Cloud Run
[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/byramag/esl-question-generator)
