import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SearchBar = ({ generateRecipe }) => {
    const [query, setQuery] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [result, setResult] = useState(""); // Store result after search
    const [showLikePopup, setShowLikePopup] = useState(false); // Controls the second popup
    const { transcript } = useSpeechRecognition();

    // Handle search logic by calling the generateRecipe function with the query
    const handleSearch = () => {
        if (generateRecipe && typeof generateRecipe === "function") {
            // Call generateRecipe with the query
            generateRecipe(query);
            setResult(`Searching for: ${query}`);
            setTimeout(() => {
                // Open the "Did you like it?" popup after the search popup closes
                setShowLikePopup(true);
            }, 500); // Adjust the delay as needed
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

    // Handle feedback from the second popup
    const handleFeedback = (feedback) => {
        console.log(`User feedback: ${feedback}`);
        setShowLikePopup(false); // Close the popup after feedback
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Allow manual text input
                    placeholder="Search..."
                    style={{
                        padding: "8px",
                        width: "200px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "8px 12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </div>

            <div className="btn-container" style={{ marginTop: "10px" }}>
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

            {/* Second popup for feedback */}
            {showLikePopup && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                        textAlign: "center",
                    }}
                >
                    <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
                        Did you enjoy the recipe?
                    </p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                            onClick={() => handleFeedback("yes")}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => handleFeedback("no")}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default SearchBar;
