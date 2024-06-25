import ContentLink from './ContentLink';
import './LinkContent.css';

export default function Content({links, handleClose}) {

    return (
            <>
                {links.map((link, idx) => 
                    <ContentLink key = {idx} route={link.route} title={link.title} handleClose = {handleClose}/>
                )}
            </>
    )
}