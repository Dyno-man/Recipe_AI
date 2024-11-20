import React, {useEffect, useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import PropTypes from "prop-types";

const SpeechToText = ({ onTranscriptChange }) => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    // Handle form submission if needed
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(e.target.text.value);
    };

    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    };

    useEffect(() => {
        // Whenever the transcript changes, pass it to the parent
        if (onTranscriptChange) {
            onTranscriptChange(transcript);
        }
    }, [transcript, onTranscriptChange]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert("Browser does not support speech recognition");
    }

    return (
        <div>
            <div className="btn-container">
                {!isListening ? (
                    <button onClick={handleStartListening} className="btn">
                        Start Listening
                    </button>
                ) : (
                    <button onClick={handleStopListening} className="btn">
                        Stop Listening
                    </button>
                )}
                <button onClick={resetTranscript} className="btn">
                    Clear Text
                </button>
                <button onClick={handleSubmit} className="btn">
                    Submit
                </button>
            </div>
        </div>
    );
};

SpeechToText.propTypes = {
    onTranscriptChange: PropTypes.func.isRequired,
};

export default SpeechToText;
