import Thumbnail from "./Thumbnail";

const Booru = ({ booru, sv }) => {

    return (
        <div className="booru-main">
            <div className="booru-grid">
                {booru.imgs && booru.imgs.map((img) => (
                    <Thumbnail key={img.full} img={img} />
                ))}
            </div>
        </div>
    );
}
 
export default Booru;