export const useLoadImage = () => {
    const load_img = (img, url) => {
        return new Promise((resolve, reject) => {
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(img);
        });
    }
    return load_img;
}