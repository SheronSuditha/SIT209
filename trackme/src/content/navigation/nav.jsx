import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { handle_logout } from '../../utils/auth';
import { useHistory } from 'react-router-dom';
function Navig() {
	const history = useHistory();
	const [ Username, setUsername ] = useState(null);
	const getUser = (e) => {
		setUsername(localStorage.getItem('username') || null);
	};

	useEffect(() => {
		getUser();
		return () => {
			//cleanup
		};
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		handle_logout();
		setUsername(null);
		setTimeout(() => {
			history.push('/login');
		}, 1000);
	};
	return (
		<div>
			<Navbar bg="primary" variant="dark" justify-content-between>
				<Navbar.Brand href="#home">
					<h1>TrackMe</h1>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">
						<h4>Home</h4>
					</Nav.Link>
					<Nav.Link href="/register-device">
						<h4>Register Devices</h4>
					</Nav.Link>
					<Nav.Link href="/send-command">
						<h4>Send Command</h4>
					</Nav.Link>
					<Nav.Link href="/about-me">
						<h4>About Me</h4>
					</Nav.Link>
				</Nav>
				<div>
					{Username !== null ? (
						<div>
							<h4 style={{ color: 'white' }}>{Username}</h4>{' '}
							<Button variant="danger" style={{ fontFamily: 'Fira Sans' }} onClick={handleLogout}>
								Logout
							</Button>
						</div>
					) : (
						<h4 style={{ color: 'red' }}>{Username}</h4>
					)}
				</div>
			</Navbar>
		</div>
	);
}

export default Navig;
