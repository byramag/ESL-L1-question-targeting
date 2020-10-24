import paddlehub as hub

module = hub.Module(name="ernie_gen")

# TODOs
# How to get eval/print of chinese with unicode issue
# Run on en pretrained model and en data
    # cn model en test data: 
    # en model cn data: [MASK] key error
    # en model en data: [MASK] key error?

result = module.finetune(
    train_path='data\\chinese\\train.txt',
    dev_path='data\\chinese\\dev.txt',
    max_steps=300,
    batch_size=2,
    use_gpu=False
)
print("Completed fine tune")

module.export(params_path=result['last_save_path'], module_name="ernie_gen_test_en", author="test")
print("Completed module export")