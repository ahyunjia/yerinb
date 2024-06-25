export default function Letter({to, from, body}) {
    return (
        <div className="letter-container">
            <div className="letter-to">{to}에게</div>
            <div className="upper-line"></div>
            <div className="letter-body">{body}</div>
            <div className="bottom-line"></div>
            <div className="letter-from">사랑을 담아, {from}</div>
        </div>
    )
}