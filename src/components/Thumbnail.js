const Thumbnail = ({ img, sv }) => {

    const open_img = (_e) => {
        sv(img);
    }

    return (
        <div className="thumbnail" onClick={open_img}>
            <p>{img.tags}</p>
        </div>
    );
}
 
export default Thumbnail;