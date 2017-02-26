import axios from 'axios';

const api = {
    nearBy: function(lat, lon, radious) {
        return axios.get('/tournament', {
            params: {
                lat: lat,
                lon: lon,
                radious: radious,
                limit: 50
            }
        })
    },

    new: function(state) {
        return axios.post("/tournament", state, {
            headers: {'Content-Type': 'application/json'}
        });
    }
}


export default api;
