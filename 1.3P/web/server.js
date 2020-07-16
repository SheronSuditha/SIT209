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

app.get('')

/**
 * Listen on port 3000
 */
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})