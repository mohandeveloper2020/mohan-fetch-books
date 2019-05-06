export default function(state = null, action) {

    switch (action.type) {
        
        case 'GET_BOOK':
          // console.log(action.payload);
          return action.payload.d;

        default: {
          return state;
        }

    };
};