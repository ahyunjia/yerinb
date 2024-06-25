import './not-found.css'
import error_img from "/public/error.jpeg";

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                ⚠️404 Error 페이지를 찾지 못했어요.
                <img className="error_img" src={`${error_img.src}`}/>
            </div>
        </div>
    )
}