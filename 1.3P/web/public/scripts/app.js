$('#navbar').load('navbar.html')
$('#footer').load('footer.html')

const devices = JSON.parse(localStorage.getItem('devices')) || []; //if no devices returns an empty array
const local_users = JSON.parse(localStorage.getItem('users')) || [];
let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || {};

const API_URL = 'http://localhost:5000/api'

/**
 * using jquery
 */
devices.forEach(element => {
    $('#devices tbody').append(`
        <tr>
            <td>${element.user}</td>
            <td>${element.name}</td>
        <tr>
    `)
});

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
    const command = $('#command').val();
    console.log(`command is ${command}`)
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

    console.log(check_for_user(username, password))

    if (check_for_user(username, password) === true) {
        $('#alert').removeClass("alert-success")
        $('#alert').addClass("alert-danger")
        $('#alert').show();
        return $('#alert').text("Already Registered")
    } else {
        $('#alert').show();
        $('#alert').removeClass("alert-danger")
        $('#alert').addClass("alert-success")
        $('#alert').text("Success!")
        local_users.push({
            username,
            password
        })
        localStorage.setItem('users', JSON.stringify(local_users))
    }
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

$('#login').on('click', handleLogin);

function handleLogin() {
    const username = $('#user').val();
    const password = $('#password').val();

    const resp = handle_auth(username, password);

}

function handle_auth(username, password) {
    $.post(`${API_URL}/authentication`, {
        name: username,
        password
    }).then((response) => {
        console.log(response)
        if (response.success) {
            localStorage.setItem('user', username);
            localStorage.setItem('isAdmin', response.isAdmin);
            localStorage.setItem('isAuthenticated', true);
            location.href = "/";
            return true;
        } else {
            console.log("no")
            return false;
        }
    })
}


/**
 * logout
 */

function logout() {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
}


/**
 * using api
 */

$.get(`${API_URL}/devices`)
    .then(response => {
        response.forEach(device => {
            $('#devices tbody').append(`
                <tr>
                    <td>${device.user}</td>       
                    <td>${device.name}</td>
                <tr>
            `)
        })
    }).catch(error => {
        console.log(`Error: ${error}`);
    });