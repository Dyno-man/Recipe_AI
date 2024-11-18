import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import generateRecipe from "./generateRecipe";

const SearchBar = ({ generateRecipe }) => {
    const [query, setQuery] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [result, setResult] = useState(''); // State to store the result after search
    const { transcript } = useSpeechRecognition();

    // Handle search logic by calling the generateRecipe function with the query
    const handleSearch = () => {
        if (generateRecipe && typeof generateRecipe === 'function') {
            // Call generateRecipe with the query
            generateRecipe(query);
            setResult(`Searching for: ${query}`);
        } else {
            console.error("generateRecipe function is not defined");
        }
    };

    // Start listening to the voice input
    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
    };

    // Stop listening to the voice input
    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    };

    // Update the query whenever the transcript changes
    useEffect(() => {
        console.log("Transcript:", transcript);
        if (transcript) {
            setQuery(transcript); // Update the query with the voice input
        }
    }, [transcript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert("Browser does not support speech recognition");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Allow manual text input
                    placeholder="Search..."
                    style={{
                        padding: '8px',
                        width: '200px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Search
                </button>
            </div>

            <div className="btn-container" style={{ marginTop: '10px' }}>
                {!isListening ? (
                    <button onClick={handleStartListening} className="btn">
                        Start Listening
                    </button>
                ) : (
                    <button onClick={handleStopListening} className="btn">
                        Stop Listening
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
