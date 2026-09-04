import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getArtworks = () => {
    return axios.get(`${API_URL}/artworks`);
}