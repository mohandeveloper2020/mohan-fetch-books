import ajax from 'utils/ajax';

function getBooks() {
    return {
        type: 'GET_BOOK',
        payload: ajax({
            url: '/Books'
        })
    };
};

export {
    getBooks
};