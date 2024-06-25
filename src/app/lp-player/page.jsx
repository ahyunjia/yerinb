"use client"
import './LPPlayer.css';
import Alert from '../components/alert/Alert';
import Player from './Player/Player';
import Loader from '../components/loader/Loader';
import { useState, useEffect } from 'react';
import {lpData} from './Player/lpData'

export default function LPPlayer() {
    const [loading, setLoading] = useState(true)
    const [closeAlert, setCloseAlert] = useState(false);
    const [lpIdx, setLpIdx] = useState(0)

    useEffect(() => {
        setLoading(false)
      }, [])
    

    return (
        <>
            {loading && <Loader/>}
            <div className="lp-player-container">
                {!closeAlert && <Alert msg={"⚠️\n유튜브를 통해 음악이 재생됩니다.\n데이터 사용에 유의해주세요."} responses={["닫기"]} effects={[()=>{setCloseAlert(true)}]}/>}
                {closeAlert && <Player {...lpData[lpIdx]} setLpIdx = {setLpIdx}/>}
            </div>
        </>
    )
}


