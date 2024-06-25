export default function BackgroundImg({img}) {
    return (
        <div className="backgroundimg-container" style={{backgroundImage: `url(${img.src})`}}></div>
    )
}