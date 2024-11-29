import axios from "axios";

const BASE_URL = `https://places.googleapis.com/v1/places:searchText?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;


const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos'
    }
};


export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);