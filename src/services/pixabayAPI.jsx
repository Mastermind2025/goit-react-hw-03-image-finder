import axios from "axios";
// import PropTypes from 'prop-types';

const URL = 'https://pixabay.com/api/?';
// const PIXABAY_KEY = '29818725-64f51c77e1d6f6ee8deed1a05';
const PIXABAY_KEY = '31212742-df383ab72ff5d16a82f89e026';
const IMAGE_TYPE = 'photo';
const SAFESEARCH = 'true';
const ORDER = 'latest';

export const PER_PAGE = 12;

export const getImages = async (query, page) => {
    const params = new URLSearchParams({
            key: PIXABAY_KEY,
            image_type: IMAGE_TYPE,
            safesearch: SAFESEARCH,
            order: ORDER,

            per_page: PER_PAGE,
            q: query,
            page: page,
            
        })

    const response = await axios.get(`${URL}${params}`);

        
    return response.data;
        
}    