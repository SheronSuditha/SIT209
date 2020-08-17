export async function check_user() {
    let username = localStorage.getItem('username');
    let status = localStorage.getItem('isAuthenticated') || false;

    console.log(status, username)
    if (status === "true") {
        return {
            state: true,
            username
        }
    } else {
        return {
            state: false,
            username: null
        };
    }
}

export function handle_logout() {
    localStorage.clear();
}