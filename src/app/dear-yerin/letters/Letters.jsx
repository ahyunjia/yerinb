import Letter from "./Letter"


export default function Letters({letters}) {

    return (
        <>
            <div className="letters w-[95vw] md:w-[70vw] max-[943px]:justify-center min-[944px]:justify-between">
                {
                    letters.map((letter, idx) => {
                        return <Letter key={idx} to={letter.to} from={letter.from} body={letter.body}/>
                    })
                } 
                
            </div>
        </>
    )
}