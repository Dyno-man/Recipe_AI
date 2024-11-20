import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import logo1 from './images/recipeAiLogo.webp'
import VoiceToText from "./voiceToText";

function App() {
    const generateRecipe = (query) => {
        console.log("Generating recipe for:", query); // Example logic, replace with your actual logic
        alert(`Generating recipe for: ${query}`);
    };
  return (
    <div className="App">
      <header className="App-header">
        <img style={{width:"150px"}} src={logo1}/>
        <p>
          Welcome to EasyRecipeezy
        </p>
          <div>
              {/* Pass the generateRecipe function as a prop */}
              <SearchBar generateRecipe={generateRecipe}/>
                <GenerateRecipes/>
          </div>
      </header>
    </div>
  );
}

export default App;
