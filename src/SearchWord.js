import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function SearchWord() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [wordDetails, setWordDetails] = useState(null);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            try {
                const response = await axios.get(`http://localhost:8080/api/dictionary/search?prefix=${value}`);
                setSuggestions(response.data);
                setError(''); // Clear any previous error
            } catch (err) {
                console.error(err);
                setError('Failed to fetch suggestions');
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (word) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/dictionary/word?name=${word}`);
            setWordDetails(response.data);
            setError(''); // Clear any previous error
        } catch (err) {
            console.error(err);
            setError('Failed to fetch word details');
            setWordDetails(null);
        }
    };

    return (
        <div className="App">
            <h1>Dictionary Application</h1>
            <div className="form-group">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search words..."
                />
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                {query.length > 0 && suggestions.length === 0 && !error && (
                    <p>No word found</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="buttons">
                <button>Search Word</button>
            </div>
            {wordDetails && (
                <div className="word-details">
                    <h2>{wordDetails.wordName}</h2> {/* Updated field name to match the backend */}
                    <p>{wordDetails.wordMean}</p>   {/* Updated field name to match the backend */}
                </div>
            )}
        </div>
    );
}

export default SearchWord;
