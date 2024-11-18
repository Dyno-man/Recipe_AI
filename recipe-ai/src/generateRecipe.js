import React from "react";
import SearchBar from "./SearchBar";

const ParentComponent = () => {
    // Define the generateRecipe function
    const generateRecipe = (query) => {
        const generateRecipe = (query) => {
            alert('This is a test pop-up!'); // Basic alert to check if it shows up
        };

    };

    return (
        <div>
            <h1>Recipe Generator</h1>
            <SearchBar generateRecipe={generateRecipe} />
        </div>
    );
};

export default ParentComponent;
