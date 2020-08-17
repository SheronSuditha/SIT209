const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const {
    API_URL
} = process.env;

test('test device array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices`).then(resp => resp.data).then(resp => {
        expect(resp[0].user).toEqual('Sheron');
    });
});

/**
 * testing device history
 */
const deviceID = "5f2741d40457c203f8c20536";

test('test device history', () => {
    return axios.get(`${API_URL}/devices/${deviceID}/device-history`)
        .then(resp => resp.data).then(resp => {
            expect(resp[0].temp).toEqual('12')
        })
})

/**
 * authentication : used async await
 */
test('test authentication status', async () => {
    const resp = await axios.post(`${API_URL}/authentication`, {
        name: "Sheron",
        password: "Sheron123"
    })
    const resp_data = await resp.data;
    expect(resp_data.success).toEqual(true);
})