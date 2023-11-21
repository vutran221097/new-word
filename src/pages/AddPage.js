import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFromStorage, saveToStorage } from "../utils/utils";

import './AddPage.css'

const AddPage = () => {
    const [wordsAdded, setWordsAdded] = useState(getFromStorage('words', []));

    const [word, setWord] = useState("")
    const [wordVN, setWordVN] = useState("")
    const navigate = useNavigate();


    const onEnterInput = () => {
        if (!word || !wordVN) return;
        const newWords = [{ word, wordVN }, ...wordsAdded]
        saveToStorage("words", newWords)
        setWordsAdded(newWords)
        setWord("")
        setWordVN("")
    }

    const onDelete = (index) => {
        const newWords = [...wordsAdded]
        newWords.splice(index, 1)
        saveToStorage("words", newWords)
        setWordsAdded(newWords)
    }

    const onEnter = (e) => {
        if (e.key === "Enter") {
            onEnterInput()
        }
    }


    return (
        <div>
            <button className="btn" onClick={() => navigate("/")}>
                Home
            </button>
            <div className="add-new-word">
                <div className="word-input">
                    <div className="input">
                        <input placeholder="Add New Word" value={word} onChange={(e) => setWord(e.target.value)} onKeyDown={onEnter} />
                        <input placeholder="Nhập Tiếng Việt" value={wordVN} onChange={(e) => setWordVN(e.target.value)} onKeyDown={onEnter} />
                    </div>
                    <div className="action">
                        <button onClick={onEnterInput}>Add</button>
                    </div>
                </div>
                {wordsAdded.length ? (
                    <div className="word-list">
                        <h2 style={{ textAlign: "center" }}>New Word List</h2>
                        {wordsAdded.map((item, index) => {
                            return (
                                <div key={index} className="word-item">
                                    <h5>{item.word} ({item.wordVN})</h5>
                                    <div className="delete-word" onClick={() => onDelete(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
                                    </div>
                                </div>
                            )
                        })}
                    </div>) : (<div></div>)}

            </div>

        </div>
    );
}

export default AddPage