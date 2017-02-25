import axios from 'axios';

const api = {
    nearBy: function(lat, lon, radious) {
        return axios.get('/tournament', {
            params: {
                lat: lat,
                lon: lon,
                radious: radious
            }
        })
    }
}


export default api;
