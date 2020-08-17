const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const randomCoordinates = require('random-coordinates');
const rand = require('random-int');

const port = process.env.PORT || 5001;
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
const Device = require('./models/device');
const { createDoc } = require('apidoc');

const ID = 219240281;
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
mongoose.connect('mongodb+srv://fildon:fildon@mongoo@sit209-sheron.glonn.mongodb.net/SIT?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(express.static('public'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

/**
 * mqtt
 */

client.on('connect', () => {
	console.log('mqtt connected');
});

client.subscribe('/sensorData');

client.on('message', (topic, message) => {
	if (topic == '/sensorData') {
		const data = JSON.parse(message);
		console.log(data);
		Device.findOne({ name: data.deviceId }, (err, device) => {
			if (err) {
				console.log(err);
			}
			console.log(device);
			const { sensorData } = device;
			const { ts, loc, temp } = data;
			sensorData.push({
				ts,
				loc,
				temp
			});
			device.sensorData = sensorData;
			device.save((err) => {
				if (err) {
					console.log(err);
				}
			});
		});
	}
});

app.use(express.static(`${__dirname}/public/generated-docs`));
app.get('/docs', (req, res) => {
	res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
 * 
 * @api {post} /send-command Emmits the command to mqtt interface
 * @apiName Data
 * @apiGroup Data Emmit
 * @apiVersion  1.0.0
 * @apiParamExample {json} Request-Example: 
 *  {
 *      deviceId: "Device Id",
 * 		command: "Command that needs to be transmit"
 *  }
 * @apiSuccessExample {string} Success-Response:
 * {
 * 		response: "sent {command} to {device}"
 * }
 * 
 */
app.post('/send-command', (req, res) => {
	console.log(req.body);
	const { device_id, command } = req.body;
	const topic = `/${ID}/command/${device_id}`;
	client.publish(topic, command, () => {
		res.send(`sent ${command} to ${device_id}`);
	});
});

/**
 * 
 * @api {put} /sensor-data Adds sensor data
 * @apiName Data
 * @apiGroup Sensor Data
 * @apiVersion  1.0.0
 * @apiParamExample {json} Request-Example: 
 *  {
 *      deviceId: "Device Id"
 *  }
 * 
 */
app.put('/sensor-data', (req, res) => {
	const { deviceId } = req.body;
	const [ lat, lon ] = randomCoordinates().split(', ');
	const ts = new Date().getTime();
	const loc = { lat, lon };
	const temp = rand(20, 50);
	const topic = `/sensorData`;
	const message = JSON.stringify({ deviceId, ts, loc, temp });
	client.publish(topic, message, () => {
		res.send('published new message');
	});
});

/**
 * final
 */
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
