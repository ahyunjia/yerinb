"use client"
import './Write.css'
import LetterForm from './LetterForm'


export default function Write() {

    return (
        <>
            <div className="write-container">
                <LetterForm initialValue={{to:"", from:"", body:""}}/>
            </div>
        </>
    )
}