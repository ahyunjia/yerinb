"use client"
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import Loader from '../../components/loader/Loader'

export default function Candle({blew, bottom, height, top}) {

    return (
        <>
            <div className='candle'>
                {!blew &&  <div id={`glow`} className='glow' style={{bottom: `calc(35% + ${bottom}em)`}}></div>}
                <div id={`candle`} style={{height:`${height}em`}}>
                    <div id='top' style={{height:`${top}em`}}>
                        <div id='knot'></div>
                        {!blew && <div id='flame' className='burn'></div>}
                    </div>
                </div>
            </div>
        </>
    )
}