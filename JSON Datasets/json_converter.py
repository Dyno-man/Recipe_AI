import csv
import json
from gensim.parsing.preprocessing import remove_stopwords

# How many recipes to load into json per chunk
chunkSize = 10000

# Whether to limit writing to a single chunk size
limit = False

# Specify your file paths
csv_file_path = 'full_dataset.csv'
json_file_path = 'recipes.json'

def csv_to_json(csv_file_path, json_file_path):
    recipes = []
    counter = 0
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        # Iterate through rows
        for row in csv_reader:
            counter += 1

            #Removes stop-words
            row["title"] = remove_stopwords(row["title"])
            row["ingredients"] = remove_stopwords(row["ingredients"].replace("\\u00b0"," deg"))
            row["directions"] = remove_stopwords(row["directions"].replace("\\u00b0"," deg"))

            # Turn ingredients fake-list string into string split by commas
            row["ingredients"] = row["ingredients"].replace("[\"","")
            row["ingredients"] = row["ingredients"].replace("\"]","")
            row["ingredients"] = row["ingredients"].replace("\", \"",", ")

            # Turn NER fake-list string into string split by commas
            row["NER"] = row["NER"].replace("[\"","")
            row["NER"] = row["NER"].replace("\"]","")
            row["NER"] = row["NER"].replace("\", \"",", ")

            # Turn directions fake-list string into string split by spaces
            row["directions"] = row["directions"].replace("[\"","")
            row["directions"] = row["directions"].replace("\"]","")
            row["directions"] = row["directions"].replace("\", \""," ")

            # Format response
            row["directions"] = "Title: " + row["title"] + ". Ingredients: " + row["ingredients"] +". Directions: " + row["directions"]

            recipe = {
                "instruction": row["NER"],
                "response": row["directions"],  # Assuming ingredients is in JSON string format
            }

            recipes.append(recipe)

            # Check if chunk sized reach
            if counter % chunkSize == 0:
                print(counter, " Converted")
                with open(json_file_path, mode='a', encoding='utf-8') as json_file:
                    json.dump(recipes, json_file, indent=4)
                recipes = []
                if limit:
                    break

    #Write whatever else remains that isn't a full chunk size
    if not limit:
        with open(json_file_path, mode='a', encoding='utf-8') as json_file:
            json.dump(recipes, json_file, indent=4)
    
    print(f"Data successfully written to {json_file_path}")

    with open(json_file_path, 'r') as file:
        filedata = file.read()

    # Replace the target string
    filedata = filedata.replace('\n', '')
    filedata = filedata.replace('  ', '')
    filedata = filedata.replace('},', '}\n')
    filedata = filedata.replace('[', '')
    filedata = filedata.replace(']', '')

    # Write the file out again
    with open(json_file_path, 'w') as file:
        file.write(filedata)

    print(f"Newlines and extra spaces successfully removed from {json_file_path}")

# Run the conversion
csv_to_json(csv_file_path, json_file_path)

