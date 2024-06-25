"use client"
import { useState } from 'react';
import CardSwipe from './CardSwipe'
import CardHover from './CardHover'
import Loader from '../components/loader/Loader';
import default_pc from '/public/default_pc.jpeg';
import sign from '/public/sign.jpeg';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function Allow() {
    const [loading, setLoading] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true)
        try{
            const response = await fetch(process.env.NEXT_PUBLIC_ROOT_URL+"/api/photo-card")
            if (response.status != 200) {
                throw new Error();
            }
            const data = await response.json()
            setImgUrl(data.img_url)
            Cookies.set('card', data.img_url, {expires: 1/24})
            setLoading(false)
            router.refresh();
        } catch(err) {
            setImgUrl(default_pc.src)
            setFlipped(true)
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loader/>}
            <div className="photo-card-container">
                <div className="card-container">
                    {!flipped && <div className='flip-card' style={{backgroundColor: "var(--gray-color)", cursor: "pointer"}} onClick={handleClick}>
                                    <span className="material-icons" style={{fontSize: "50px", position: "absolute", top: "50%", left: "50%", transform:"translate(-50%, -50%)"}}> question_mark </span>
                                </div>}
                    {flipped && <>
                        <div className="block h-auto w-auto xl:hidden">
                            <CardSwipe img={imgUrl} sign={sign}/>
                        </div>
                        <div className="hidden h-auto w-auto xl:block">
                            <CardHover img={imgUrl} sign={sign}/>
                        </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}


