const initialState = {
    status: false,
    message: null
}

export default function alert_reducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'SET_ALERT':
            return state = {
                status: true,
                message: payload.message
            };
            break;
        case 'REMOVE_ALERT':
            return state = initialState;
        default:
            return state;
    }
}