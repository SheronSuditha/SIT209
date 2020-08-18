const initialState = [];

export default function device_reducer(state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case 'ADD_DEVICE':
            state = payload.location
        default:
            return state;
    }
}