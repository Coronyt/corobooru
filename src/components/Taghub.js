import Tag from "./Tag";

const Taghub = ({booru, filters, setf, appf, rgen, rrev}) => {

    let tags = Object.keys(booru.tags);

    const load_filter = (tag) => {
        let newf = [...filters];
        newf.push(tag);
        appf(newf, booru);
    }

    const unload_filter = (tag) => {
        let newf = [...filters];
        newf.splice(newf.indexOf(tag), 1);
        appf(newf, booru);
    }

    const booru_sort = (tag1, tag2) => {
        const len1 = booru.tags[tag1].length;
        const len2 = booru.tags[tag2].length;
        if (len1 > len2) {
            return -1
        }
        if (len1 < len2) {
            return 1
        }
        else {
            if (tag1 > tag2) {
                return 1
            }
            if (tag1 < tag2) {
                return -1
            }
        }
    }

    const dyn_join = (filters) => {
        let res = [];
        filters.forEach((filter) => {
            const curr_imgs = booru.tags[filter];
            curr_imgs.forEach((img) => {
                img.tags.forEach((tag) => {
                    if (!filters.includes(tag) && !res.includes(tag)) {
                        res.push(tag);
                    }
                })
            });
        });
        return res;
    }

    if (booru.tags) {
        if (filters.length > 0) {
            let arr_f = filters;
            let arr_r = booru.tags;
            let arr_d = dyn_join(arr_f);
            arr_f.sort(booru_sort);
            arr_d.sort(booru_sort);
            tags = arr_f.concat(arr_d);
        } else {
            tags.sort(booru_sort);
        }
    }

    return (
        <div className="taghub">
            <ul>
                {booru.tags && tags.map((tag) => (
                    <Tag tag={tag} len={booru.tags[tag].length} active={
                        (filters) 
                        && (filters.length > 0) 
                        && (filters.includes(tag)) ? true : false
                    } loadf={load_filter} rgen={rgen} unloadf={unload_filter} rrev={rrev} />
                ))}
            </ul>
        </div>
    );
}
 
export default Taghub;