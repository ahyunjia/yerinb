import Content from "../Content"
import './TopNavbar.css'

export default function TopNavbar() {
    const links = [{route: "/birthday-wish", title: "BIRTHDAY WISH"}, {route: "/lp-player", title: "LP PLAYER"}, 
                    {route: "/", title: "logo"}, {route: "/photo-card", title: "PHOTO CARD"},
                    {route: "/dear-yerin/letters", title: "DEAR. YERIN"}]

    return (
        <div className="topnavbar-container">
            <Content links={links}/>
        </div>
    )
}