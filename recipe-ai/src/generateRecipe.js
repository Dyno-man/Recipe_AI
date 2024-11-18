import React from "react";
import SearchBar from "./SearchBar";

const App = () => {
    // Define the generateRecipe function in the parent
    const generateRecipe = (query) => {
        console.log("Generating recipe for:", query); // Example logic, replace with your actual logic
        alert(`Generating recipe for: ${query}`);
    };

    return (
        <div>
            <h1>Recipe Generator</h1>
            {/* Pass the generateRecipe function as a prop */}
            <SearchBar generateRecipe={generateRecipe} />
        </div>
    );
};

export default App;
