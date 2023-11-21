import { useState } from "react";
import { SayButton } from 'react-say';
import { useNavigate } from "react-router-dom";

import './HomePage.css'
import { getFromStorage } from "../utils/utils";

const HomePage = () => {
    const wordsAdded = getFromStorage('words', []);
    const dice = Math.floor(Math.random() * wordsAdded.length)
    const [word, setWord] = useState(wordsAdded[dice])
    const initWordList = [...wordsAdded]
    initWordList.splice(dice, 1)
    const [wordList, setWordList] = useState(initWordList)

    const [index, setIndex] = useState(1)
    const [show, setShow] = useState("hidden")
    const navigate = useNavigate();

    const generateNewWord = () => {
        const newWordIndex = Math.floor(Math.random() * wordList.length)
        if (wordList[newWordIndex].word === word.word) {
            generateNewWord()
            return;
        }
        setWord(wordList[newWordIndex])
        setIndex(index + 1)
        const newList = [...wordList]
        newList.splice(newWordIndex, 1)
        setWordList(newList)
        setShow('hidden')
    }

    const testAgain = () => {
        setWordList(wordsAdded);
        setIndex(1);
        const dice = Math.floor(Math.random() * wordsAdded.length)
        setWord(wordsAdded[dice])
        const initWordList = [...wordsAdded]
        initWordList.splice(dice, 1)
        setWordList(initWordList)
        setShow('hidden')
    }

    const handdleShow = () => {
        if (show === 'show') {
            setShow('hidden')
        } else {
            setShow('show')
        }
    }


    return (
        <div>
            <button className="btn" onClick={() => navigate('/add-new-word')}>
                Add
            </button>
            <div className="new-word">
                {!wordsAdded.length ? (<div></div>) : (<h3>{index}/{wordsAdded.length}</h3>)}
                <h1>{word?.word}</h1>
                <h1 className={`meaning ${show}`} onClick={handdleShow}>{word?.wordVN}</h1>


                <div className="play-button" hidden={!wordsAdded.length}>
                    <SayButton
                        onClick={event => console.log(event)}
                        speak={word?.word}

                    >
                        <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" /></svg>
                    </SayButton>
                </div>


                {wordsAdded.length === index && wordsAdded.length !== 1 ? (<button onClick={() => testAgain()} className="new-word-btn"><span>Test Again</span></button>) : (<div></div>)}

                {wordsAdded.length > 1 && wordsAdded.length !== index ? (<button onClick={generateNewWord} className="new-word-btn" disabled={wordsAdded.length === 1}><span>New Word</span></button>) : (<div></div>)}

                {!wordsAdded.length ? (<button onClick={() => navigate('/add-new-word')} className="new-word-btn"><span>Add New Word To Learn</span></button>) : (<div></div>)}
            </div>

        </div>
    );
}

export default HomePage