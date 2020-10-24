import numpy as np
import paddle.fluid.dygraph as D
from ernie.tokenizing_ernie import ErnieTokenizer
from ernie.modeling_ernie import ErnieModel

D.guard().__enter__() # activate paddle `dygrpah` mode

model = ErnieModel.from_pretrained('.\model-ernie1.0.1')    # Try to get pretrained model from server, make sure you have network connection
model.eval()
print("Completed model setup")

tokenizer = ErnieTokenizer.from_pretrained('.\model-ernie1.0.1')
print("Completed tokenizer setup")

ids, _ = tokenizer.encode('hello world')
ids = D.to_variable(np.expand_dims(ids, 0))  # insert extra `batch` dimension
pooled, encoded = model(ids)                 # eager execution
print(pooled.numpy())                        # convert  results to numpy