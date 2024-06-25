import './PhotoCard.css';
import './Card.css';

import Allow from './Allow';
import Reject from './Reject';
import { cookies } from 'next/headers';

function checkCookie() {
    const cookie = cookies().get('card')
    return cookie
}

export default function PhotoCard() {
    const cookie = checkCookie();

    if (!cookie) {
        return <Allow/>
    } else {
        return <Reject img={cookie.value}/>
    }
}


