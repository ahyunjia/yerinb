import ReactPlayer from "react-player/lazy";
import {useState} from 'react';
import Loader from "@/app/components/loader/Loader";

export default function Player({idx, title, url, lp_img, cover, setLpIdx}) {
    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState(0)

    const handlePlay = () => {setPlay(!play)}
    const handleStop = () => {setPlay(false)}
    const handleLoading = () => {setLoading(false)}


    const handlePrev = () => {
        setTrack(0)
        setLoading(true)
        if (idx == 0) {
            setLpIdx(3)
        } else {
            setLpIdx(idx-1)
        }}

    const handleNext = () => {
        setTrack(0)
        setLoading(true)
        if (idx == 3) {
            setLpIdx(0)
        } else {
            setLpIdx(idx+1)
        } 
    }

    const nextTrack = () => {
        if (track == 5) {
            setTrack(0)
        } else {
            setTrack(track+1)
        }
    }

    return (
        <>
            {loading && <Loader/>}
            <div className="player-container h-1/3 w-5/6 sm:h-3/5 lg:h-1/2 lg:w-1/2">
                <div className="title-container">
                    <span className="material-icons"> music_note </span>
                    {title}
                </div>
                <div className="lp-container">
                    <div className="center w-full sm:w-full lg:w-4/5">
                        <div id="cover">
                            <img id="cover-img" src={cover.src}/>
                        </div>
                        <div id="lp" className="left-24 sm:left-1/3">
                            <img id="lp-img" className={play ? "play" : ""} src={lp_img.src}/>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button className="prev-btn" onClick={handlePrev}>
                        <span className="material-icons"> skip_previous </span>
                    </button>
                    <button className="play-btn" onClick={handlePlay}>
                        <span className="material-icons"> {play ? "pause" : "play_arrow"} </span>
                    </button>
                    <button className="stop-btn" onClick={handleStop}>
                        <span className="material-icons"> stop </span>
                    </button>
                    <button className="next-btn" onClick={handleNext}>
                        <span className="material-icons"> skip_next </span>
                    </button>
                </div>
                <div style={{display: "invisible"}}>
                    <ReactPlayer 
                        url={url[track]}
                        playing={play}
                        width={"1px"}
                        height={"1px"}
                        onReady={handleLoading}
                        onEnded={idx == 3 && track < 5 ? nextTrack : handleStop}
                        />
                </div>
            </div>
        </>
    )
}