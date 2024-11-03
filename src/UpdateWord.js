import React, { useState } from 'react';
import axios from 'axios';
import './AddWord.js';

function AddWord() {
    const [wordName, setWordName] = useState('');
    const [wordMean, setWordMean] = useState('');
    const [message, setMessage] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleAddWord = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/dictionary/add', null, {
                params: { wordName, wordMean }
            });
            setMessage(response.data.message);
            setWordName('');
            setWordMean('');
        } catch (error) {
            setMessage('Error adding word');
        }
    };

    const handleSearchWord = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dictionary/search', {
                params: { wordName }
            });
            setSearchResult(response.data.found ? 'Word found' : 'Word not found');
            setWordName('');
        } catch (error) {
            setSearchResult('Error searching word');
        }
    };

    const handleDeleteWord = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/dictionary/delete', {
                params: { wordName }
            });
            setMessage(response.data.message);
            setWordName('');
        } catch (error) {
            setMessage('Error deleting word');
        }
    };

    return (
        <div className="App">
            <h1>Dictionary Application</h1>
            <div className="form-group">
                <input
                    type="text"
                    value={wordName}
                    onChange={(e) => setWordName(e.target.value)}
                    placeholder="Enter word"
                />
                <input
                    type="text"
                    value={wordMean}
                    onChange={(e) => setWordMean(e.target.value)}
                    placeholder="Enter word meaning"
                />
            </div>
            <div className="buttons">
                <button onClick={handleAddWord}>Add Word</button>
                <button onClick={handleSearchWord}>Search Word</button>
                <button onClick={handleDeleteWord}>Delete Word</button>
            </div>
            {message && <p>{message}</p>}
            {searchResult && <p>{searchResult}</p>}
        </div>
    );
}

export default AddWord;
