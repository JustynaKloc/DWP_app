import React, { Component } from 'react';
import {
	Container,
	Form,
	Row,
	Col,
	InputGroup,
	Button,
	Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import './Groups.css';

class Groups extends Component {
	state = {
		groups: [],
		group_join: '',
		group_create: '',
		selected_group: '',
		showAlert: false,
		action: '',
		action_group: '',
		members: [],
		uid: firebase.auth().currentUser.uid,
	};

	getGroups = () => {
		axios
			.post('http://localhost:3210/api/getMyGroups', {
				uid: this.state.uid,
			})
			.then(res => {
				let data = res.data;
				console.log(data);
				this.setState({
					groups: data,
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	componentDidMount = () => {
		this.getGroups();
	};

	handleJoin = e => {
		e.preventDefault();
		document.getElementById('joinGroupForm').reset();
		axios
			.post('http://localhost:3210/api/joinGroup', {
				uid: this.state.uid,
				gid: this.state.group_join,
			})
			.then(() => {
				this.getGroups();
				this.setState({
					showAlert: true,
					action: 'joined',
				});
			})
			.catch(err => console.log(err));
	};

	handleCreate = e => {
		e.preventDefault();
		document.getElementById('createGroupForm').reset();
		axios
			.post('http://localhost:3210/api/createGroup', {
				g_name: this.state.group_create,
				uid: this.state.uid,
			})
			.then(() => {
				this.getGroups();
				this.setState({
					showAlert: true,
					action: 'created',
					action_group: this.state.group_create,
				});
			})
			.catch(err => console.log(err));
	};

	handleLeave = (ugid, g_name) => {
		console.log(ugid, g_name);
		axios
			.post('http://localhost:3210/api/leaveGroup', {
				ugid: ugid,
				uid: this.state.uid,
			})
			.then(() => {
				this.getGroups();
				this.setState({
					showAlert: true,
					action: 'left',
					action_group: g_name,
				});
				if (ugid === this.state.selected_group.ugid) {
					this.setState({ selected_group: '' });
				}
			})
			.catch(err => console.log(err));
	};

	handleSelect = group => {
		if (group === this.state.selected_group) return;

		console.log(group);
		axios
			.post('http://localhost:3210/api/getMembers', {
				gid: group.gid,
			})
			.then(res => {
				let members = res.data;
				console.log(members);
				this.setState({ members: members, selected_group: group });
			})
			.catch(err => console.log(err));
	};

		handleDistance = group => {
    		if (group === this.state.selected_group) return;

    		console.log(group);
    		axios
    			.post('http://localhost:3210/api/getDistance', {
    				gid: group.gid,
    			})
    			.then(res => {
    				let members = res.data;
    				console.log(members);
    				this.setState({ members: members, selected_group: group });
    			})
    			.catch(err => console.log(err));
    	};

	handleChange = e => this.setState({ [e.target.id]: e.target.value });
	handleClose = () => this.setState({ showAlert: false });

	render() {
		return (
			<Container className='mainContainer'>
				{/* Join Group Form */}
				<Form id='joinGroupForm' onSubmit={this.handleJoin}>
					<Row className='shadow-lg p-3 mb-5 bg-white'>
						<Col lg={10}>
							<Form.Row className='align-items-center'>
								{/* Entry box */}
								<Form.Group as={Col}>
									<Form.Label className='float-left'>
										Join Group
									</Form.Label>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text>@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											id='group_join'
											type='text'
											aria-describedby='inputGroupPrepend'
											placeholder='Group Name'
											onChange={this.handleChange}
											required
										/>
									</InputGroup>
									<Form.Text className='float-left'>
										Enter the name of the group you want to
										join.
									</Form.Text>
								</Form.Group>
								{/* Submission button */}
							</Form.Row>
						</Col>
						<Col lg={2} className='joinGroup'>
							<Button
								variant='outline-primary'
								type='submit'
								className='float-left'
							>
								Join
							</Button>
						</Col>
					</Row>
				</Form>

				{/* Joined Groups and Members Tables */}
				<Row className='shadow-lg p-3 mb-5 bg-white'>
					{/* Select group */}
					<Col>
						<h5>Joined Groups</h5>
						{this.state.groups.map(group => (
							<Row key={group.gid} className='m-2'>
								{/* Button to select group and list members */}
								<Col>
									<Button
										onClick={() => this.handleSelect(group)}
									>
										{group.Group.g_name}
									</Button>
								</Col>
								{/* Button to leave group */}
								<Col>
									<Button
										onClick={() =>
											this.handleLeave(
												group.ugid,
												group.Group.g_name,
											)
										}
									>
										Leave
									</Button>
								</Col>
							</Row>
						))}
					</Col>

					{/* List members of selected group */}
					{this.state.selected_group ? (
						<Col>
							<h5>
								{this.state.selected_group.Group.g_name}
							</h5>
							<h5>
								Member -> distance
							</h5>
							{this.state.members.map(member => (
								<Link
									key={member.User.uid}
									to={'/userdash/' + member.User.uid}
								>
									{member.User.f_name} {member.User.l_name}
								</Link>
							))}
							    <span> </span>
							    <span> </span>
                        {this.state.members.map(member => (
								<Link
									key={member.User.uid}
									to={'/userdash/' + member.User.uid}
								>
									{ member.User.totalpoints}
								</Link>
							))}

						</Col>
					) : null}
				</Row>

				{/* Create Group Form */}
				<Form id='createGroupForm' onSubmit={this.handleCreate}>
					<Row className='shadow-lg p-3 mb-5 bg-white'>
						<Col lg={10}>
							<Form.Row className='align-items-center'>
								{/* Entry box */}
								<Form.Group as={Col}>
									<Form.Label className='float-left'>
										Create Group
									</Form.Label>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text>@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											id='group_create'
											type='text'
											aria-describedby='inputGroupPrepend'
											placeholder='Group Name'
											onChange={this.handleChange}
											required
										/>
									</InputGroup>
									<Form.Text className='float-left'>
										Enter the name of the group you want to
										create.
									</Form.Text>
								</Form.Group>
							</Form.Row>
						</Col>
						<Col lg={2} className='joinGroup'>
							<Button
								variant='outline-success'
								type='submit'
								className='float-left'
							>
								Create
							</Button>
						</Col>
					</Row>
				</Form>

				{/* Action Notifications */}
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
								You have successfully {this.state.action}{' '}
								{this.state.action_group}!
							</span>
						</Row>
					</Alert>
				)}
			</Container>
		);
	}
}

export default Groups;
