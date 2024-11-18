import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { transcript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    // Handle search logic
    const handleSearch = () => {
        console.log("Searching for:", query);
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
        if (transcript) {
            setQuery(transcript);
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
