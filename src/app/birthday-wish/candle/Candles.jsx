import Candle from "./Candle";
import './Candles.css'

export default function Candles({blew, num, bottom, height, top}) {
    const candles = []
    for (let i = 0; i < num; i++) {
        candles.push(<Candle key={i} blew={blew} bottom={bottom} height={height} top={top}/>);
      }

    return (
        <div className="candles" style={{width:`calc(${num}*1.5em)`}}>
            {candles}
        </div>
    )
}