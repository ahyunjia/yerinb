import Link from 'next/link';
import { Inconsolata } from 'next/font/google';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const inco = Inconsolata({
    weight: '400',
    subsets: ['latin']})

export default function ContentLink({route, title, handleClose}) {

    const path = usePathname();

    const [hover, setHover] = useState(false)

    const handleMouseOver = () => {setHover(true)}
    const handleMouseOut = () => {setHover(false)}

    return (
            <div className={`link-container md:h-full ${(title != "logo" && path == route ? "selected" : "")}`}>
                <Link className={`md:absolute md:h-full md:text-xl link ${inco.className} ${(hover || path == route? "link-hover" : "")}`} onClick={handleClose} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href={route}> 
                    {title=='logo' ? 
                            <div style={{width: "100%", height: "100%"}}>
                                <img src="/logo.png" style={{width: "auto", height: "100%", margin: "auto"}}/>
                            </div> :
                            <div className="md:w-fit md:relative md:h-fit title">
                                {title}
                             </div>
                    }
                </Link>
            </div>
    )
}

// md:inset-x-auto md:text-xl md:relative md:h-full 