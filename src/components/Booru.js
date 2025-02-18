import Thumbnail from "./Thumbnail";

const Booru = ({ booru, filtered }) => {

    return (
        <div className="booru-main">
            <div className="booru-grid">
                {/* If the component is passed an unfiltered booru */}
                {booru.imgs && filtered && (filtered.length == 0) && booru.imgs.map((img) => (
                    <Thumbnail key={img.full} img={img} />
                ))}
                {/* If the component is passed a filtered booru */}
                {filtered && (filtered.length > 0) && filtered.map((img) => (
                    <Thumbnail key={img.full} img={img} />
                ))}
                {/* If the user just removed the last filter */}
                {!filtered && booru.imgs && booru.imgs.map((img) => (
                    <Thumbnail key={img.full} img={img} />
                ))}
            </div>
        </div>
    );
}
 
export default Booru;