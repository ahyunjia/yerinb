import img1 from "/public/background1.jpeg";
import img2 from "/public/background2.jpeg";
import img3 from "/public/background3.jpeg";
import img4 from "/public/background4.jpeg";
import img5 from "/public/background5.jpeg";
import { Inconsolata } from 'next/font/google';
import BackgroundImg from "./BackgroundImg";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const backgrounds = [img1, img2, img3, img4, img5]
const lastIdx = backgrounds.length-1

const inco = Inconsolata({
    weight: '400',
    subsets: ['latin']})

export default function Background() {
    const [imgidx, setImgidx] = useState(0)

    const swipeLeft = () => {
        if (imgidx == lastIdx) {
            setImgidx(0)
        } else {
            setImgidx(imgidx+1)
        }
    }

    const swipeRight = () => {
        setImgidx(imgidx-1)
    }

    const handlers = useSwipeable({
        onSwipedLeft: swipeLeft
    })

    return (
        <div className="background-continer">
            <button className={`hidden md:block img-slider-btn ${inco.className}`} style={{left: 0, visibility: (imgidx == 0) ? "hidden" : "visible"}} onClick={swipeRight}>&#10094;</button>
            <div className="img-slider" style={{transform: `translateX(-${imgidx*20}%)`, transition: (imgidx != 0) ? "0.3s ease-in" : "0s"}} {...handlers}>
                {
                    backgrounds.map((url, idx) => <BackgroundImg key={idx} img={url}/>)
                }
            </div>
            <button className={`hidden md:block img-slider-btn ${inco.className}`} style={{right: 0}} onClick={swipeLeft}>&#10095;</button>
        </div>
    )
}