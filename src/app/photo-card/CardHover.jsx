"use client"

export default function CardHover({img, sign}) {

    return (
        <div className="flip-card after:content-['1시간마다\00a0뽑을\00a0수\00a0있어요.']" id="flip-card-hover">
            <div className="flip-card-inner" id="flip-card-inner">
                <div className="flip-card-front" style={{backgroundImage:`url(${img})`}}></div>
                <div className="flip-card-back" style={{backgroundImage:`url(${sign.src})`}}></div>
            </div>
        </div>
    )
}