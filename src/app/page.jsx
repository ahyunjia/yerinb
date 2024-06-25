"use client"
import './Home.css';
import { Luxurious_Script } from 'next/font/google';
import { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import Background from './home/Background';

const luxurious = Luxurious_Script({
  weight: '400',
  subsets: ['latin']})


export default function Home() {
  const [coord, setCoord] = useState({clientX: 0, clientY: 0})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.addEventListener("mousemove", mousemove);
    setCoord({clientX: window.screen.width/2, clientY: window.screen.height/2})
    setLoading(false)
  }, [])

  const mousemove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (mouseY > window.screen.height * 0.15) {
      setCoord({clientX: mouseX, clientY: mouseY})
    }

  } 


  return (
    <>
    {loading && <Loader/>}
      <div className={`${luxurious.className}`} id='msg' style={{left:`${coord.clientX}px`, top:`${coord.clientY}px`}}>
          Happy 27th Birthday, Yerin &#10047;
      </div>
      <Background/>
    </>
  )
}
