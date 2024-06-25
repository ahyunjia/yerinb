import './Alert.css';

export default function Alert({msg, responses, effects}) {

    return (
        <div className="alert-box">
            <div className="msg-box">
                {msg}
            </div>
            <div className="line"></div>
            <div className="response-box">
                {responses.map((response, idx) => 
                    <button key={idx} onClick={effects[idx]} id={idx != 0 ? "response-border" : ""}>{response}</button>)}
            </div>
        </div>
    )
}