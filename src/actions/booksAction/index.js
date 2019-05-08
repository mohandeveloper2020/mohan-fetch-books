import { BASE_URL, TOKEN } from 'utils/url.js';

function getBooks() {
    return {
        type: 'GET_BOOK',
        payload: fetch(`${BASE_URL}/Books?token=${TOKEN}`, {
            method: 'GET'
        })
        .then( (response) => {
            return response.json();
        })
        .then( (myJson) => {
            // console.log(myJson);
            return myJson;
        })
    }
};

export {
    getBooks
};