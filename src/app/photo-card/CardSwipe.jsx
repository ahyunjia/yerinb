"use client"
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

let front_deg = 0

export default function CardSwipe({img, sign}) {
    const [transformFront, setTransformFront] = useState({transform: `rotateY(${front_deg}deg)`})

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            front_deg = front_deg - 180;
            setTransformFront({transform: `rotateY(${front_deg}deg)`})
        },
        onSwipedRight: () => {
            front_deg = front_deg + 180;
            setTransformFront({transform: `rotateY(${front_deg}deg)`})
        }
    })

    return (      
        <div className="flip-card after:content-['1시간마다\00a0뽑을\00a0수\00a0있어요.']" {...handlers}>
            <div className="flip-card-inner" style={transformFront}>
                <div className="flip-card-front" style={{backgroundImage:`url(${img})`}}></div>
                <div className="flip-card-back" style={{backgroundImage:`url(${sign.src})`}}></div>
            </div>
        </div>  
    )
}