import React, { Component } from 'react';
import UserFeed from './UserFeed';
import Charts from './Charts';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import './Leaderboard.css';

class UserDash extends Component {
	state = { user_activities: [], loaded: false };

	componentDidMount = () => {
		const { uid } = this.props.match.params;
		axios
			.post('http://localhost:3210/api/getUserStats', {
				uid: uid,
			})
			.then(res => {
				this.setState({ user_activities: res.data, loaded: true });
				console.log('Data:', res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		if (!this.state.loaded) return null;
		return (
			<Container className='mainContainer'>
				<Row className='shadow-lg p-3 mb-5 bg-white'>
					<Charts user_activities={this.state.user_activities} />
				</Row>
				<Row className='shadow-lg p-3 mb-5 bg-white'>
					<UserFeed user_activities={this.state.user_activities} />
				</Row>
			</Container>
		);
	}
}

export default UserDash;
