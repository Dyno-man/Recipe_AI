import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import logo1 from './images/recipeAiLogo.webp'
import VoiceToText from "./voiceToText";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img style={{width:"150px"}} src={logo1}/>
        <p>
          Welcome to EasyRecipeezy
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <SearchBar/>
          <VoiceToText/>
      </header>
    </div>
  );
}

export default App;
