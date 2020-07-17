$('#navbar').load('navbar.html')
$('#footer').load('footer.html')

const devices = JSON.parse(localStorage.getItem('devices')) || []; //if no devices returns an empty array
const local_users = JSON.parse(localStorage.getItem('users')) || [];

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
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let usrr = users.find(usr => usr.username === username && usr.password === password)
    if (usrr) {
        return true;
    } else {
        return false
    }
}



















/**
 * using basic js for DOM manipulation.
 */

/*
devices.push({
    user: "Mary",
    name: "Mary's iPhone"
});
devices.push({
    user: "Alex",
    name: "Alex's Surface Pro"
});
devices.push({
    user: "Mary",
    name: "Mary's MacBook"
});

devices.forEach(element => {
    const table = document.querySelector("#devices");
    const row = document.createElement('tr');

    const user = document.createElement('td');
    const userText = document.createTextNode(element.user);
    user.appendChild(userText);

    const name = document.createElement('td');
    const nameText = document.createTextNode(element.name)
    name.appendChild(nameText);

    row.appendChild(user);
    row.appendChild(name);

    table.appendChild(row);
});
*/

/*
document.querySelector('#add-device').addEventListener('click', function () {
    const user = document.querySelector('#user').value;
    const name = document.querySelector('#name').value;
    devices.push({
        user,
        name
    }) //can use because user: user = user ES6
    console.log(devices)
})
*/