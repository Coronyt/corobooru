import Thumbnail from "./Thumbnail";

const Booru = ({booru}) => {

    return (
        <div className="booru-main">
            <div className="booru-grid">
                <div className="booru-grid-row">
                    {booru.imgs && booru.imgs.map((img) => (
                        <Thumbnail img={img} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Booru;