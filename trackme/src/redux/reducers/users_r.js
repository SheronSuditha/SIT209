const initialState = {
    username: null
}

export default function user_reducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'ADD_USER':
            return state = {
                username: payload.username,
            };
            break;
        case "USER_LOGOUT":
            return state = {
                username: null
            }
            break;
        default:
            return state;
    }
}