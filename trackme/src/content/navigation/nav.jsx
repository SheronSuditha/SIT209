import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { handle_logout, get_user_devices } from '../../utils/auth';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout_user } from '../../redux/actions/user_a';

function Navig() {
	const history = useHistory();
	const [ Username, setUsername ] = useState(null);
	const getUser = (e) => {
		setUsername(localStorage.getItem('username') || null);
	};

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
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
			dispatch(logout_user());
			history.push('/login');
		}, 1000);
	};
	return (
		<div>
			<Navbar bg="primary" variant="dark" justify-content-between>
				<Navbar.Brand href="/">
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
					{user.username !== null ? (
						<div>
							<h4 style={{ color: 'white' }}>{user.username}</h4>{' '}
							<Button variant="danger" style={{ fontFamily: 'Fira Sans' }} onClick={handleLogout}>
								Logout
							</Button>
						</div>
					) : (
						<h4 style={{ color: 'red' }}>{user.username}</h4>
					)}
				</div>
			</Navbar>
		</div>
	);
}

export default Navig;
