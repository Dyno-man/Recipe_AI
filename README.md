
<a id="readme-top"></a>
<div align="center">
<h1 align="center">Eezy ReciPeezy</h1>

  <p align="center">
    A dyanmic AI-powered recipe generator for variable ingredients and *flavor profiles.
  </p>

  <p align="center">
    
<!--PUT IMAGE OF FRONT PAGE HERE <img src="https://nthorn.com/images/rust-pseudokude/solving_example.gif" width="500">-->
</p>
</div>

- [About](#about)
- [Usage](#usage)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Dataset Parsing](#dataset-parsing)
- [License](#license)



<!-- ABOUT -->
## About
Eezy ReciPeezy is a dynamic AI powered recipe generator designed to give you the perfect recipe for your limited ingredients and *preferences.

Powered by React and [SmolLM2](https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct).

 * [Recipe NLG](https://huggingface.co/datasets/mbien/recipe_nlg) dataset (filtered)
 * [SmolLM2](https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct) with 135 million parameters
 * 78 hours of training (Further training in progress)

*work in progress
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->
## Usage
Visit at [http://asteroidbelter.com/](http://asteroidbelter.com/) (Temporary domain name)
## Getting Started
### Prerequisites
1. Download [Python](https://www.python.org/downloads/)
2. Install packages
   ```sh
   pip install gensim
   pip install transformers
   pip install --force-reinstall numpy==1.26.4
   ```

### Installation
1. Clone/download the repo
   ```sh
   git clone https://github.com/Dyno-man/Recipe_AI.git
   ```

### Dataset Parsing
Dataset used: [Recipe NLG](https://huggingface.co/datasets/mbien/recipe_nlg)

Dataset is filtered for innapropriate recipes and parsed from .csv to .jsonl, Gensim required for stop-words when parsing.

Dataset parser/filterer [json_converter.py](https://github.com/Dyno-man/Recipe_AI/blob/main/JSON%20Datasets/json_converter.py) usage described in comments.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
