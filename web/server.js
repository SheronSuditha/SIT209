const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'))


/**
 * routes
 */
app.get('/', (req, res) => {
    res.sendFile(`${base}/device-list.html`)
})

app.get('/login', (req, res) => {
    res.sendFile(`${base}/login.html`)
})

app.get('/register', (req, res) => {
    res.sendFile(`${base}/registeration.html`)
})

app.get('/register-device', (req, res) => {
    res.sendFile(`${base}/register-device.html`)
})

app.get('/send-command', (req, res) => {
    res.sendFile(`${base}/send-command.html`)
})

app.get('/about', (req, res) => {
    res.sendFile(`${base}/about-me.html`)
})


app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
})




/**
 * Listen on port 3000
 */
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})