const devices = [];

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
 * using basic js for DOM manipulation.
 */

/*
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