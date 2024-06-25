"use client"
import './BirthdayWish.css'
import Candles from './candle/Candles'
import Loader from '../components/loader/Loader'
import Alert from '../components/alert/Alert'
import { useState, useEffect } from 'react'
import { Sacramento } from 'next/font/google';

let audioContext;
let microphone, meter;  
let intervalID;

const sacramento = Sacramento({
    weight: '400',
    subsets: ['latin']})
export default function BirthdayWish() {
    const [loading, setLoading] = useState(false)
    const [blew, setBlew] = useState(false);
    const [reaction, setReaction] = useState(false)
    const [msg, setMsg] = useState("")

    const responses = ["닫기"]
    const effects = [()=>{setReaction(false)}]

    useEffect(() => {
        setLoading(true)
        requestAudioAccess().then((stream) => {
            setLoading(false)
            intervalID = setInterval(() => { 
                let blowing = checkBlowing(meter)
                if (blowing) {
                    clearInterval(intervalID);
                    intervalID = null;
                    setBlew(true)
                    setLoading(true)
                    getCarrotNum()
                }}, 1000)

        }).catch((err) => {
            setLoading(false)
            alert(err.message)
        });
    }, [])

    const getCarrotNum = async () => {

        try{
            const response = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/wish-count");
            if (response.status != 200) {
                throw new Error();
            }
            const {count} = await response.json()
            setMsg(`🎂\n지금까지 총 ${count}분의 당근이\n예린이의 birthday wish를\n빌어주었어요 !`)
            
        } catch(err) {
            setMsg(`😢\n데이터를 전달하지 못했어요.\n하지만 마음은 잘 전달되었어요 !`)
        }
        setLoading(false)
        setReaction(true)
    }

    return (
        <div className="birthday-wish-container">
            {loading && <Loader/>}
            {reaction && <Alert msg={msg} responses={responses} effects={effects}/>}
            <div className={`instruction ${sacramento.className}`} id={"top-inst"}> Make a Wish for Yerin </div>
            <div className={`instruction ${sacramento.className}`} id={"bottom-inst"}> ...and blow out the candles ! </div>
            <div className="w-4/5 h-1/2 md:w-2/3 cake-candle-container ">
                <div style={{position: "absolute", left:"30%", top: "20%", zIndex:"1"}}>
                    <Candles blew={blew} num={3} scale={2} bottom={6} height={7} top={1.8}/>
                </div>
                <div style={{position: "absolute", left:"85%", top: "50%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={9} height={10} top={2}/>
                </div>
                <div style={{position: "absolute", left:"20%", top: "60%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={6} height={7} top={1.8}/>
                </div>
                <div style={{position: "absolute", left:"35%", top: "65%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={6} height={7} top={1.8}/>
                </div>
                <div style={{position: "absolute", left:"50%", top: "65%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={6} height={7} top={1.8}/>
                </div>
                <div style={{position: "absolute", left:"65%", top: "60%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={6} height={7} top={1.8}/>
                </div>
                <div style={{position: "absolute", left:"10%", top: "45%"}}>
                    <Candles blew={blew} num={1} scale={2} bottom={9} height={10} top={2}/>
                </div>
                <div className="cake-container">
                    <img className="cake-flower" src='/cake_flower.png'/>
                    <div className="cake"></div>
                </div>
            </div>
        </div>
    )
}


function setAudioStream (stream) {
    audioContext = new AudioContext();
    microphone = audioContext.createMediaStreamSource(stream);
    meter = createAudioMeter(audioContext);
    
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    microphone.connect(filter);
    filter.connect(meter);

};

function requestAudioAccess() {
    return new Promise((resolve, reject) => {
    if (window.navigator.mediaDevices){
        window.navigator.mediaDevices.getUserMedia({audio: true, video:false})
        .then((stream) => {
            try {
                setAudioStream(stream);
                resolve(stream)
            } catch(err) {
                reject (new Error("마이크에 접근할 수 없습니다."))
            }
        }).catch((err) => {
            //user rejected
            reject(new Error("촛불을 불려면 마이크를 허용해주세요."));
        });
    } else {
        //brower doesn't support media devices
        reject(new Error("해당 브라우저가 마이크에 접근할 수 없습니다."))
    }
})
};

function checkBlowing(meter) {
    // Check if is blowing
    let lowpass = 0;
    const ALPHA = 0.5, THRESHOLD = 0.09;
    
    lowpass = ALPHA * meter.volume + (1.0 - ALPHA) * lowpass;
    return (lowpass > THRESHOLD);
}

/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.
*/

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
        x = buf[i];
        if (Math.abs(x)>=this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}