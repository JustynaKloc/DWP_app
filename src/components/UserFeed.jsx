import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Container } from 'react-bootstrap';
class UserFeed extends Component {
	render() {
		console.log(this.props.user_activities);
		return (
			<Container>
				<h5>Activity Feed</h5>
				{/* Get recent activities from database and display cards of each of them */}
				{this.props.user_activities.map(activity => {
					return (
						<ActivityCard
							key={activity.name}
							name={activity.name}
							type={activity.type}
							duration={activity.duration}
							points={activity.points}
						/>
					);
				})}
			</Container>
		);
	}
}

export default UserFeed;
