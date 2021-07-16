import React, { Component } from 'react';
import {
	Col,
	Row,
	Container,
	Button,
	Form,
	InputGroup,
	Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import './Friends.css';

class Friends extends Component {
	state = {
		followers: [],
		follows: [],
		uid: firebase.auth().currentUser.uid,
		newfollow: '',
		validated: false,
		showAlert: false,
		alertAction: '',
	};

	// Reads followers in db and stores them in state
	getFollowers = () => {
		axios
			.post('http://localhost:3210/api/getFollowers', {
				following_uid: this.state.uid,
			})
			.then(res => {
				let data = res.data;
				this.setState({
					followers: data,
				});
			})
			.catch(err => {
				//alert('No one is following you. How sad.');
				console.log(err);
			});
	};

	// Reads follows from db and stores them in state
	getFollows = () => {
		axios
			.post('http://localhost:3210/api/getFollows', {
				follower_uid: this.state.uid,
			})
			.then(res => {
				let data = res.data;
				this.setState({
					follows: data,
				});
			})
			.catch(err => {
				//alert('You are following no one! What a loner.');
				console.log(err);
			});
	};

	// Gets followers and follows to display on load
	componentDidMount = () => {
		this.getFollowers();
		this.getFollows();
	};

	// Removes follow from follow list
	handleUnfollow = e => {
		axios
			.post('http://localhost:3210/api/unfollow', {
				following_uid: e.target.key,
				follower_uid: this.state.uid,
			})
			.then(() => {
				this.getFollows();
				this.setState({ showAlert: true, alertAction: 'unfollowed' });
			})
			.catch(err => console.log(err));
	};

	// Used by add follow form, creates follow object for db and then updates follows in state
	handleFollow = e => {
		e.preventDefault();
		document.getElementById('newFollowForm').reset();
		axios
			.post('http://localhost:3210/api/follow', {
				following_uid: this.state.newfollow,
				follower_uid: this.state.uid,
			})
			.then(() => {
				this.getFollows();
				this.setState({ showAlert: true, alertAction: 'followed' });
			})
			.catch(err => console.log(err));
	};

	// Used by add follow form, updates state object with new follow username
	handleChange = e => {
		this.setState({
			newfollow: e.target.value,
		});
	};

	handleClose = () => this.setState({ showAlert: false });

	render() {
		return (
			<Container className='mainContainer'>
				{/* Form for following new person */}
				<Form id='newFollowForm' onSubmit={this.handleSubmit}>
					<Row className='shadow-lg p-3 mb-5 bg-white'>
						<Col lg={10}>
							<Form.Row className='align-items-center'>
								<Form.Group as={Col} controlId='newFollowName'>
									<Form.Label className='float-left'>
										Enter a Username to Follow
									</Form.Label>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text>@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											type='text'
											aria-describedby='inputGroupPrepend'
											placeholder='Username'
											onChange={this.handleChange}
											required
										/>
									</InputGroup>
								</Form.Group>
							</Form.Row>
						</Col>
						<Col className='followButton'>
							<Button variant='outline-primary' type='submit'>
								Follow
							</Button>
						</Col>
					</Row>
				</Form>
				<Row>
					<Col className='shadow-lg p-3 mb-5 bg-white' lg={5}>
						<h5>Following</h5>
						{this.state.follows.map(follow => (
							<Row>
								<Col>
									<Link to={'/userdash/' + follow.uid}>
										{follow.followerName}
									</Link>
								</Col>
								<Col>
									<Button
										key={follow.fid}
										variant='outline-info'
										size='sm'
										onClick={this.handleClick}
									>
										Unfollow
									</Button>
								</Col>
							</Row>
						))}
					</Col>
					<Col lg={2} />
					<Col className='shadow-lg p-3 mb-5 bg-white' lg={5}>
						<h5>Followers</h5>
						{this.state.followers.map(follower => (
							<Row>
								<Link to={'/userdash/' + follower.uid}>
									{follower.followerName}
								</Link>
							</Row>
						))}
					</Col>
				</Row>

				{/* Follow Notifications */}
				{this.state.showAlert && (
					<Alert
						dismissible
						show={this.state.alert}
						variant='success'
						onClose={this.handleClose}
						//transition
					>
						<Row className='d-flex justify-content-center align-middle'>
							<span className='align-middle'>
								You have successfully {this.state.alertAction}{' '}
								{this.state.newfollow}!
							</span>
						</Row>
					</Alert>
				)}
			</Container>
		);
	}
}

export default Friends;
