import Thumbnail from "./Thumbnail";

const Booru = ({ booru, sv }) => {

    return (
        <div className="booru-main">
            <div className="booru-grid">
                <div className="booru-grid-row">
                    {booru.imgs && booru.imgs.map((img) => (
                        <Thumbnail key={img.full} img={img} sv={sv} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Booru;