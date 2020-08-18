const axios = require('axios');
const API_URL = 'https://api-na3dzd5ri.vercel.app/api';

export async function check_user() {
    let username = localStorage.getItem('username');
    let status = localStorage.getItem('isAuthenticated') || false;

    console.log(status, username)
    if (status === "true") {
        return {
            state: true,
            username
        }
    } else {
        return {
            state: false,
            username: null
        };
    }
}

export function handle_logout() {
    localStorage.clear();
}

export async function get_user_fromauth(username, password) {
    const resp_ = await axios.post(`${API_URL}/authentication`, {
        name: username,
        password
    });
    return resp_;
}

export async function get_user_devices() {
    const user = localStorage.getItem('username');
    const resp = await axios.get(`${API_URL}/users/${user}/devices`);
    return resp.data;
}

export async function get_device_history(deviceid) {
    const resp = await axios.get(`${API_URL}/devices/${deviceid}/device-history`);
    const data = await resp.data;
    return data;
}