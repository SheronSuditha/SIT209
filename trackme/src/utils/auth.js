const axios = require('axios');
const API_URL = 'https://api-na3dzd5ri.vercel.app/api';
const MQTT_URL = 'http://localhost:5001/send-command';

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

export async function register_user(user, pass) {
    const resp = await axios.post(`${API_URL}/registration`, {
        name: user,
        password: pass,
        isAdmin: false
    })
    const data = resp.data;
    return data;
}

export async function register_device(devname, username) {
    const sensorData = [];
    const body = {
        name: devname,
        user: username,
        sensorData
    }
    const resp = await axios.post(`${API_URL}/devices`, body)
    const data = await resp.data;
    return data;
}

export async function send_command_mqtt(device, command) {
    const resp = await axios.post(`${MQTT_URL}`, {
        device_id: device,
        command
    })
    const data = await resp.data;
    return data;
}