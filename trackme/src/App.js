import React, { useState, useEffect, Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

/**
 * pages
 */
import Navig from './content/navigation/nav';
import Login from './content/login/login';
import Register from './content/register/register';
import Home from './content/home/home';
import RegDevice from './content/regdevice/regdevice';
import SendCommand from './content/sendcommand/sendCommand';

import { check_user } from './utils/auth';
import { Jumbotron, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { set_username } from './redux/actions/user_a';

function App() {
	const dispatch = useDispatch();

	//const [ Username, setUsername ] = useState(null);
	const ProtectedRoutes = ({ component: Component, ...rest }) => {
		const [ isLoading, setIsLoading ] = useState(true);
		const [ Authentication, setAuthentication ] = useState(false);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		const auth = async () => {
			const status = await check_user();
			const status_data = await status.state;
			if (status_data === true) {
				setAuthentication(true);
				//setUsername(status.username);
			} else {
				setAuthentication(false);
				//setUsername(null);
			}
		};

		auth();

		return isLoading !== true ? (
			<Route
				{...rest}
				render={(props) => {
					console.log(Authentication);
					if (Authentication === true) {
						return <Component {...props} />;
					} else {
						return <Redirect to="/login" />;
					}
				}}
			/>
		) : (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '95vh'
				}}
			>
				<Jumbotron style={{ alignItems: 'center' }}>
					<Container>
						<h1>Hang on!</h1>
						<p>Getting my gear ready to display your devices!</p>
					</Container>
				</Jumbotron>
			</div>
		);
	};

	const check_for_username = () => {
		if (localStorage.getItem('username')) {
			dispatch(
				set_username({
					username: localStorage.getItem('username')
				})
			);
		}
	};

	check_for_username();

	return (
		<Router>
			<div>
				<Navig />
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<ProtectedRoutes path="/" exact component={Home} />
					<ProtectedRoutes path="/send-command" exact component={SendCommand} />
					<ProtectedRoutes path="/register-device" exact component={RegDevice} />
				</Switch>
			</div>
		</Router>
	);
}
export default App;
