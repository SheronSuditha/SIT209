$('#navbar').load('navbar.html')
$('#footer').load('footer.html')

const devices = JSON.parse(localStorage.getItem('devices')) || []; //if no devices returns an empty array
const local_users = JSON.parse(localStorage.getItem('users')) || [];
let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || {};

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

    devices.push({
        name,
        user
    });
    localStorage.setItem('devices', JSON.stringify(devices))
    console.log(location.href = '/');
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

    const result = check_for_user(username, password);

    if (result === true) {
        isAuthenticated = {
            status: true,
            username: username
        }
        console.log(isAuthenticated)
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        window.location.replace("/")
    } else {
        isAuthenticated = {
            status: false,
        }
    }
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

$.get('http://localhost:3001/devices')
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