import csv
import json
from gensim.parsing.preprocessing import remove_stopwords

# How many recipes to load into json per chunk
chunkSize = 10000

# Whether to limit writing to a single chunk size
limit = False

# Whether to print chunks completed & reason for discarding in-real-time
debug = True

# Words that filter a recipe from being added (keep lowercase).
# Consider adding a space before/after words to avoid unintended filtering (e.g "evil" filtering "Deviled Eggs")
unfavorable_signs = [" email", " boyfriend", " girlfriend", " evil", "fuck", " shit", "substr"]

# Specify your file paths
csv_file_path = 'full_dataset.csv'
json_file_path = 'recipes.jsonl'


def clean_text(text):
    # What to replace and what to replace with. If a list lacks a second item, then it is replaced with nothing.
    replace_list=[["[\""], ["\"]"], ["}",")"], ["{","("], ["\""], ["\\"], ["\\\\\\"],["\\\\"], ['\\u00bc', '1/4'], ["\\u00b0"," deg"]]
    for item in replace_list:
        if len(item) > 1:
            text = text.replace(item[0],item[1])
        else:
            text = text.replace(item[0],"")
    return text

def csv_to_json(csv_file_path, json_file_path):
    recipes = []
    counter = 0
    added = 0
    discarded = 0
    discard = False
    print("Reading from:", csv_file_path)
    print("Output file:", json_file_path)
    print("Chunk size:", chunkSize, "recipes")
    print("Limit to single chunk:", limit)
    print("Debug:",debug,"\n")

    print("Starting conversion ...","\n")

    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        # Iterate through rows
        for row in csv_reader:
            counter += 1

            
            
            #Removes stop-words
            row["title"] = remove_stopwords(row["title"])
            row["ingredients"] = remove_stopwords(row["ingredients"])
            row["directions"] = remove_stopwords(row["directions"])

            # Turn ingredients fake-list string into string split by commas
            row["ingredients"] = clean_text(row["ingredients"])
            
            # Turn NER fake-list string into string split by commas
            row["NER"] = clean_text(row["NER"].replace("\", \"",", "))

            # Turn directions fake-list string into string split by spaces
            row["directions"] = clean_text(row["directions"].replace("\", \""," "))

            # Format response
            row["directions"] = "Title: " + row["title"] + ". Ingredients: " + row["ingredients"] +". Directions: " + row["directions"]

            recipe = {
                "instruction": row["NER"],
                "response": row["directions"],  # Assuming ingredients is in JSON string format
            }

            # Skip recipes with likely unfavorable directions/ingredients
            combo = (row["directions"] + row["NER"]).lower()
            for word in unfavorable_signs:
                if word in combo:
                    if debug:
                        print("Discarding recipe", counter,"for \"" + word + "\"")
                    discarded += 1
                    discard = True
                    break
            if discard:
                discard = False
                continue
            added += 1

            recipes.append(recipe)

            # Check if chunk sized reach
            if added % chunkSize == 0:
                if debug:
                    print(added, "Recipes converted")
                with open(json_file_path, mode='a', encoding='utf-8') as json_file:
                    json.dump(recipes, json_file, indent=4)
                recipes = []
                if limit:
                    break

    #Write whatever else remains that isn't a full chunk size
    if not limit:
        print("Total converted recipes:",added)
        with open(json_file_path, mode='a', encoding='utf-8') as json_file:
            json.dump(recipes, json_file, indent=4)

    print("Total discarded recipes:",discarded)

    print(f"Formatting to JSONL\nReading file ...")

    with open(json_file_path, 'r') as file:
        filedata = file.read()

    print(f"Formatting file ...")

    filedata = filedata.replace('\n', '')
    filedata = filedata.replace('  ', '')
    filedata = filedata.replace('},', '}\n')
    filedata = filedata.replace('[', '')
    filedata = filedata.replace(']', '')

    print(f"Writing file ...")

    # Write the file out again
    with open(json_file_path, 'w') as file:
        file.write(filedata)

    print("--COMPLETE--\nOutput written to", json_file_path)

# Run the conversion
csv_to_json(csv_file_path, json_file_path)
pause=input()
