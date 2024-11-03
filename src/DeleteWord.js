import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function DeleteWord() {
    const [wordName, setWordName] = useState('');
    const [message, setMessage] = useState('');

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
        <div>
            <h2>Delete Word</h2>
            <div className="form-group">
                <input
                    type="text"
                    value={wordName}
                    onChange={(e) => setWordName(e.target.value)}
                    placeholder="Enter word"
                />
            </div>
            <div className="buttons">
                <button onClick={handleDeleteWord}>Delete Word</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteWord;
