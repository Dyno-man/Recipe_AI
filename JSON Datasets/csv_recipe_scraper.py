import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    recipes = []
    
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            recipe = {
                "title": row["title"],
                "ingredients": json.loads(row["ingredients"]),  # Assuming ingredients is in JSON string format
                "directions": json.loads(row["directions"])     # Assuming directions is in JSON string format
            }
            recipes.append(recipe)
    
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(recipes, json_file, indent=4)
    
    print(f"Data successfully written to {json_file_path}")

# Specify your file paths
csv_file_path = 'path_to_your_csv_file.csv'
json_file_path = 'output_recipes.json'

# Run the conversion
csv_to_json(csv_file_path, json_file_path)
