"use client"
import './Hamburger.css';

export default function Hamburger({open, handleOpen}) {

    const openSide = () => {
        handleOpen(!open)
    }

    return (
        <div className='hamburger' style={{transform: "scale(0.8)"}}>
            <div className='yer' onClick = {openSide}>
                <div className={open ? 'top-open' : 'top'}></div>
                <div className={open ? 'mid-open' : 'mid'}></div>
                <div className={open ? 'bot-open' : 'bot'}></div>
            </div>
            <div className= 'inb' id={open ? 'inb-open' : ''}>
                <div className='i'></div>
                <div className='n'>
                    <div className='n-1'></div>
                    <div className='n-2'></div>
                    <div className='n-3'></div>
                </div>
                <div className='b'>
                    <div className='b-1'></div>
                    <div className='b-2'></div>
                </div>   
            </div> 
        </div>
    )
}