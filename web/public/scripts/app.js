$('#navbar').load('navbar.html')
$('#footer').load('footer.html')

const devices = JSON.parse(localStorage.getItem('devices')) || []; //if no devices returns an empty array
const local_users = JSON.parse(localStorage.getItem('users')) || [];
let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || {};

const current_user = localStorage.getItem('user');

const API_URL = 'https://api-na3dzd5ri.vercel.app/api';
const MQTT_URL = 'http://localhost:5001/send-command'

if (current_user) {
    $.get(`${API_URL}/users/${current_user}/devices`)
        .then((response) => {
            console.log(response)
            response.data.forEach((device) => {
                $('#devices tbody').append(`
                    <tr data-device-id=${device._id}>
                        <td>${device.user}</td>
                        <td>${device.name}</td>
                    </tr>
                `)

                $('#devices tbody tr').on('click', (e) => {
                    const deviceId = e.currentTarget.getAttribute('data-device-id');
                    $.get(`${API_URL}/devices/${deviceId}/device-history`)
                        .then(response => {
                            response.map(sensorData => {
                                console.log(sensorData.ts, sensorData.temp, sensorData.loc.lat, sensorData.loc.lon)
                                $('#historyContent').append(`<tr>
                                <td>${sensorData.ts}</td> 
                                <td>${sensorData.temp}</td>      
                                <td>${sensorData.loc.lat}</td>      
                                <td>${sensorData.loc.lon}</td>   
                                 </tr>  
                                 `);
                            });
                            $('#historyModal').modal('show');
                        })
                })
            })
        })
        .catch(error => {
            console.log(`Error: ${error}`)
        })
} else {
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/register') {
        location.href = "/login";
    }
}


/**
 * using jquery
 */


/**
 * Adding a device
 */

$('#add-device').on('click', function () {
    const user = $('#user').val();
    const name = $('#name').val();
    const sensorData = [];

    const body = {
        name,
        user,
        sensorData
    };

    /**
     * Code to handle sending the data into the api
     */

    $.post(`${API_URL}/devices`, body)
        .then(response => {
            /**
             * handles saving the data in the local storage
             */

            devices.push({
                name,
                user
            });
            localStorage.setItem('devices', JSON.stringify(devices))
            location.href = "/";
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
})

/**
 * using send-command
 */
$('#send-command').on('click', function () {
    const device_id = $('#deviceid').val();
    const command = $('#command').val();
    console.log(device_id, command)
    $.post(`${MQTT_URL}`, {
        device_id,
        command
    }).then((response) => {
        console.log(response);
    })
})


/**
 * registeration hook
 */

$('#register').on('click', handle_register);

function handle_register() {
    const username = $('#user').val();
    const password = $('#password').val();
    const password_confirmation = $('#cpassword').val();

    if (!username || !password) {
        $('#alert').show();
        return $('#alert').text("Please check if the username or the password is entered")
    }

    if (password !== password_confirmation) {
        $('#alert').show();
        return $('#alert').text("Entered passwords does not match.")
    }

    $.post(`${API_URL}/registration`, {
        name: username,
        password,
        isAdmin: false
    }).then((response) => {
        if (response.success) {
            successful_registeration();
            location.href = "/login"
        } else {
            an_error_occurred_registeration();
        }
    })

}

function an_error_occurred_registeration() {
    $('#alert').removeClass("alert-success")
    $('#alert').addClass("alert-danger")
    $('#alert').show();
    $('#alert').text("Something happened! Please retry")
}

function user_already_registered() {
    $('#alert').removeClass("alert-success")
    $('#alert').addClass("alert-danger")
    $('#alert').show();
    $('#alert').text("Already Registered")
}

function successful_registeration() {
    $('#alert').show();
    $('#alert').removeClass("alert-danger")
    $('#alert').addClass("alert-success")
    $('#alert').text("Success!")
}



function check_for_user(username, password) {
    let usrr = local_users.find(usr => usr.username === username && usr.password === password)
    if (usrr) {
        return true;
    } else {
        return false
    }
}


/**
 * handle login
 */

$('#login').on('click', () => {
    handleLogin();
});

function handleLogin() {
    const username = $('#user').val();
    const password = $('#password').val();
    handle_auth(username, password);
}

function handle_auth(username, password) {
    $.post(`${API_URL}/authentication`, {
        name: username,
        password
    }).then((response) => {
        console.warn(response)
        if (response.success) {
            localStorage.setItem('user', username);
            localStorage.setItem('isAdmin', response.isAdmin);
            localStorage.setItem('isAuthenticated', true);
            location.href = "/";
        } else {
            $('#login-alert').show();
            $('#login-alert').text("Error Invalid Details!");
        }
    })
}


/**
 * logout
 */

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated')
    location.href = '/login';
}


/**
 * using api
 */

/**
 * Handling the model
 */