import axios from "axios";
import config from "../../config";


export function apiFeaturedPlaylists(params) {
    return new Promise((resolve, reject) => {
        let url = config.api.baseUrl + "/browse/featured-playlists?";

        if (params.limit) {
            url += `limit=${params.limit}`;
        } else {
            url += `limit=10`;
        }

        if (params.offset) {
            url += `&offset=${params.offset}`;
        }

        axios
            .get(url, {
                headers: {
                  'Authorization': 'Bearer ' +  params.token,
                },
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(errors => {
                reject(errors.response.data);
            });
    });
}