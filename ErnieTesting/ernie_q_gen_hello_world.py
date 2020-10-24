import paddlehub as hub

# module = hub.Module(name='ernie_gen')
# answer = ["Tomatoes are a type of fruit because they are the fruiting bodies of the plant."]

# results = module.generate(texts=answer, use_gpu=False, beam_width=5)
# print(results)


module = hub.Module(name="ernie_gen_test_en")

test_texts = ["汴水夹榆柳，今留胡马踪。", "太平蜀雀异，仍映碧桃间。"]
results = module.generate(texts=test_texts, use_gpu=True, beam_width=5)

# for result in results:
#     print(result) # how to print in utf-8 under cmd

print("generated results")
result_strings = [' '.join(result) for result in results]
result_string = '\\n'.join(result_strings)
# for result in results:
#     result_string = result_string + '\\n' + ' '.join(result)
print("finished pushing results into str")

with open("generated_results.txt", 'w', encoding="utf-8") as fout:
    fout.write(result_string)
print("finished writing out to file")
