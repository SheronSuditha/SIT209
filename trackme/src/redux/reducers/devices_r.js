const initialState = {
    username: null,
    device_details: null
}

export default function device_reducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'ADD_DEVICE':
            state = {
                username: payload.username,
                device_details: payload.device
            };
        default:
            return state;
    }
}