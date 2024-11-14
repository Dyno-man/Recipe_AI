from transformers import TrainingArguments, Trainer, AutoModelForCausalLM, AutoTokenizer
from datasets import load_dataset

model_name = 'smolllm2-135m-instruct'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

dataset = load_dataset('json', data_files={'train' : 'test.jsonl', 'validation' : ''})

tokenize_dataset = dataset.map(tokenizer_func(dataset), batched=True)

training_args = TrainingArguments(
    output="./testing_trainer",
    num_train_epochs=3,
    per_device_training_batch_size = 1,
    per_device_training_eval_size = 1,
    evaluation_strategy="steps",
    eval_steps=500,
    logging_steps=100,
    save_steps=500,
    learning_rate=5e-5,
    weight_decay = 0.1,
    save_total_limit=2,
    fp16=True,
)

trainer = Trainer(
    model= model,
    args= training_args,
    train_dataset=tokenized_datasets['train'],
    eval_datasets=tokenized_datasets['validation'],
    tokenizer=tokenizer,
)

trainer.train()

eval_results = trainer.evaluate()
print(eval_results)

model.save_pretrained('/AI\ Iterations/smallTests')
tokenizer.save_pretrained('/AI\ Iterations/smallTests')


def tokenizer_func(example):
    input_text = f"Instructions: {example['instructions']}\nResponse: {example['response']}"
    return tokenizer(input_text, truncation=True, max_length= 512)