import sign from '/public/sign.jpeg';
import CardSwipe from './CardSwipe'
import CardHover from './CardHover'

export default function Reject({img}) {

    return (
            <>
                <div className="photo-card-container">
                    <div className="card-container">
                        <div className="block h-auto w-auto xl:hidden">
                            <CardSwipe img={img} sign={sign}/>
                        </div>
                        <div className="hidden h-auto w-auto xl:block">
                            <CardHover img={img} sign={sign}/>
                        </div>
                    </div>
                </div>
            </>
    )
}