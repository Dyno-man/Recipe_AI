from transformers import TrainingArguments, Trainer, AutoModelForCausalLM, AutoTokenizer
from datasets import load_dataset

def tokenizer_func(examples):
    inputs = [
        f"Instruction: {instr}\nResponse: {resp}"
        for instr, resp in zip(examples['instruction'], examples['response'])
    ]
    tokenized_inputs = tokenizer(
        inputs,
        truncation=True,
        max_length=512,
        padding='max_length',  # Optional: ensures consistent input lengths
        return_tensors='pt'    # Optional: returns PyTorch tensors
    )
    return tokenized_inputs


model_name = 'HuggingFaceTB/SmolLM2-135M-Instruct'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

dataset = load_dataset('json', data_files={
    'train': '/Users/grantversluis/Documents/GitHub/Recipe_AI/JSON Datasets/training.jsonl',
    'validation': '/Users/grantversluis/Documents/GitHub/Recipe_AI/JSON Datasets/eval.jsonl'
})

tokenized_datasets = dataset.map(tokenizer_func, batched=True)

training_args = TrainingArguments(
    output_dir="./testing_trainer",
    num_train_epochs=3,
    per_device_train_batch_size=1,
    per_device_eval_batch_size=1,
    evaluation_strategy="steps",
    eval_steps=500,
    logging_steps=100,
    save_steps=500,
    learning_rate=5e-5,
    weight_decay=0.1,
    save_total_limit=2,
    fp16=False,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['validation'],
    tokenizer=tokenizer,
)

trainer.train()

eval_results = trainer.evaluate()
print(eval_results)

model.save_pretrained('/AI Iterations/smallTests')
tokenizer.save_pretrained('/AI Iterations/smallTests')
