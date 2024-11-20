import React, { useState } from "react";
import SearchBar from "./SearchBar";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipe, setRecipe] = useState(null);

    const generateRecipe = async (query) => {
        console.log("Generating recipe for:", query);
        setLoading(true);
        setError(null);
        setRecipe(null);

        try {
            const response = await fetch('http://localhost:5000/api/generate_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: query }),
            });

            const data = await response.json();
            console.log('Recipe Generated:', data);
            setRecipe(data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Recipe Generator</h1>
            <SearchBar generateRecipe={generateRecipe} />
            {loading && <p>Generating recipe...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {recipe && (
                <div>
                    <h2>Your Recipe:</h2>
                    <pre>{JSON.stringify(recipe, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
