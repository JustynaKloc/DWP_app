import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';

class ActivityCard extends Component {
	render() {
		const props = this.props;
		return (
			<Container>
				<Row className='container'>
					<Col className='ActivityName'>
						<p>{props.type}</p>
					</Col>
					{props.duration ? (
						<Col>Duration: {props.duration}</Col>
					) : null}
					{props.points ? (
						<Col>Points Earned: {props.points}</Col>
					) : null}
				</Row>
			</Container>
		);
	}
}

export default ActivityCard;
