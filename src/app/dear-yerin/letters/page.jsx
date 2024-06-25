import './Letters.css'
import Letters from './Letters'
import Link from 'next/link'

async function getData() {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/dear-yerin`, { cache: 'no-store' })
        if (response.status != 200) {
            throw new Error();
        }

        return response.json()
    } catch(err) {
        return []
    }
}

export default async function DearYerin() {
    const letters = await getData()

    return (
        <>
            <div className="dear-yerin-container">
                <div className="letters-container">
                    <Letters letters={letters}/>
                </div>
                <Link className="write-letter-btn" href={"/dear-yerin/write"}>
                    <span className="material-icons letter-icon" >
                        mail_outline
                    </span>
                </Link>
            </div>
        </>
    )
}