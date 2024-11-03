import React, { useState } from 'react';
import axios from 'axios';
import './AddWord.css';

function AddWord() {
    const [wordName, setWordName] = useState('');
    const [wordMean, setWordMean] = useState('');
    const [message, setMessage] = useState('');
    const [validationMessageName, setValidationMessageName] = useState('');
    const [validationMessageMean, setValidationMessageMean] = useState('');
    const [validationMessageUnique, setValidationMessageUnique] = useState('');

    const handleChangeName = async (e) => {
        const value = e.target.value;
        setWordName(value);

        // Regular expression to allow only alphabets
        const regex = /^[A-Za-z -]*$/;
        if (!regex.test(value)) {
            setValidationMessageName('Only alphabets are allowed.');
        } else if (value.trim() === '') {
            setValidationMessageName('Word name cannot be empty.');
        } else {
            setValidationMessageName('');
        }

        // Check if wordName is unique
        try {
            const response = await axios.get('http://localhost:8080/api/dictionary/word', {
                params: { name: value }
            });
            if (response.data) {
                setValidationMessageUnique('Word name already exist.');
            } else {
                setValidationMessageUnique('');
            }
        } catch (error) {
            setValidationMessageUnique('');
        }
    };

    const handleChangeMean = (e) => {
        const value = e.target.value;
        setWordMean(value);

        // Regular expression to allow only alphabets
        const regex = /^[A-Za-z -]*$/;
        if (!regex.test(value)) {
            setValidationMessageMean('Only alphabets are allowed.');
        } else if (value.trim() === '') {
            setValidationMessageMean('Word meaning cannot be empty.');
        } else {
            setValidationMessageMean('');
        }
    };

    const handleAddWord = async () => {
        if (validationMessageName || validationMessageMean || validationMessageUnique) {
            setMessage('Please fix the errors before submitting.');
            return;
        }

        if (!wordName.trim() || !wordMean.trim()) {
            setMessage('Word name and meaning cannot be empty.');
            return;
        }

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

    return (
        <div className="App">
            <h1>Dictionary Application</h1>
            <div className="inputs">
                <input
                    type="text"
                    value={wordName}
                    onChange={handleChangeName}
                    placeholder="Enter word"
                    name="inputName"
                />
                {validationMessageName && <p style={{ color: 'red' }}>{validationMessageName}</p>}
                {validationMessageUnique && <p style={{ color: 'red' }}>{validationMessageUnique}</p>}
                <input
                    type="text"
                    className="input1"
                    value={wordMean}
                    onChange={handleChangeMean}
                    placeholder="Enter word meaning"
                    name="inputName"
                />
                {validationMessageMean && <p style={{ color: 'red' }}>{validationMessageMean}</p>}
            </div>
            <div className="buttons">
                <button onClick={handleAddWord}>Add Word</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddWord;
