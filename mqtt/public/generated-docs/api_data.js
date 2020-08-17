define({ "api": [
  {
    "type": "post",
    "url": "/send-command",
    "title": "Emmits the command to mqtt interface",
    "name": "Data",
    "group": "Data_Emmit",
    "version": "1.0.0",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example: ",
          "content": " {\n     deviceId: \"Device Id\",\n\t\tcommand: \"Command that needs to be transmit\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\tresponse: \"sent {command} to {device}\"\n}",
          "type": "string"
        }
      ]
    },
    "filename": "./mqtt.js",
    "groupTitle": "Data_Emmit"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "J:\\Deakin\\SIT209 Developing IOT Applications\\Introduce Yourself\\mqtt\\public\\generated-docs\\main.js",
    "groupTitle": "J:\\Deakin\\SIT209 Developing IOT Applications\\Introduce Yourself\\mqtt\\public\\generated-docs\\main.js",
    "name": ""
  },
  {
    "type": "put",
    "url": "/sensor-data",
    "title": "Adds sensor data",
    "name": "Data",
    "group": "Sensor_Data",
    "version": "1.0.0",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example: ",
          "content": "{\n    deviceId: \"Device Id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./mqtt.js",
    "groupTitle": "Sensor_Data"
  }
] });
