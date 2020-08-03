const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public/generated-docs`));
app.get('/docs', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});
const port = 5000;


const Device = require('./models/device')
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/**
 * 
 * @api {get} /api/test Test-Endpoint
 * @apiGroup Help
 * @apiSuccessExample {string} Success-Response:
 * {
 *     response : The API is Working!
 * }
 */
app.get('/api/test', (req, res) => {
    res.json({
        response: "The API is Working!"
    })
});




app.post('/api/registration', (req, res) => {
    const {
        name,
        password,
        isAdmin
    } = req.body;
    const newUser = new User({
        name,
        password,
        isAdmin
    })

    newUser.save(err => {
        return err ? res.send(err) : res.status(200).json({
            success: true,
            message: "Created new User"
        })
    })
})

app.post('/api/authentication', (req, res) => {
    console.log(req.body);
    const {
        name,
        password
    } = req.body;

    console.log(name, password);

    User.findOne({
        name
    }, (err, found) => {
        err === true ? res.json({
                success: false,
                message: "Something Happened!",
                error: err.message
            }) :
            found === null ?
            res.status(404).json({
                success: false,
                message: 'No User Found!',
                isAdmin: null
            }) :
            found.password === password ?
            res.status(200).json({
                success: true,
                message: 'Authenticated successfully',
                isAdmin: found.isAdmin
            }) :
            res.status(403).json({
                success: false,
                message: 'Invalid Password',
                isAdmin: null
            })
    })
})

/**
 * @api {get} /api/devices All devices added
 * @apiGroup Device
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    {
 *      "_id": "an Example Id",
 *      "name": "Mary's iPhone",
 *      "user": "mary",
 *      "sensorData": [
 *        {
 *          "ts": "1529542230",
 *          "temp": 12,
 *          "loc": {
 *            "lat": -37.84674,
 *            "lon": 145.115113
 *          }
 *        },
 *        {
 *          "ts": "1529572230",
 *          "temp": 17,
 *          "loc": {
 *            "lat": -37.850026,
 *            "lon": 145.117683
 *          }
 *        }
 *      ]
 *    }
 *  ]
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "User does not exist"
 *  }
 */
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (err == true) {
            return res.send(err);
        } else {
            return res.send(devices);
        }
    });
});

/**
 * 
 * @api {post} /api/send-command Send Command
 * @apiGroup Commands
 * 
 * @apiParamExample {json} Request-Example: 
 *  {
 *      message: "Something here in the body"
 *  }
 * @apiSuccessExample {type} Success-Response:
 * {
 *     Status : "Success!"
 * }
 * 
 * 
 */
app.post('/api/send-command', (req, res) => {
    console.log(body);
    res.json({
        status: "Success!",
    })
});


/**
 * 
 * @api {post} /api/devices Add a device
 * @apiName Devices
 * @apiGroup Device
 * @apiVersion  1.0.0
 * @apiParamExample {json} Request-Example: 
 *  {
 *      name: "Device Name",
 *      user: "Username",
 *      sensorData: []
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     response : "Device Successfully added!"
 * }
 * @apiErrorExample {json} Error-Response:
     {
         response: "Error",
         error: errorMessage
     }
 * 
 */
app.post('/api/devices', (req, res) => {
    console.log(req.body)
    const {
        name,
        user,
        sensorData
    } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err ? res.json({
            response: "Error",
            error: err.message
        }) : res.json({
            response: "Device Successfully added!"
        });
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${port}`);
})