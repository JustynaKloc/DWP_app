import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
// import axios from 'axios';

class Charts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//Structure that chart.js interprets and renders chart from
			chartData: {
				labels: [],
				datasets: [
					{
						label: '',
						data: [],
					},
				],
			},
			cumulativeData: {
				labels: [],
				datasets: [
					{
						label: '',
						data: [],
					},
				],
			},

			//Time scale to display chart in
			timescale: '',
		};
	}

	//On component loading
	componentDidMount = () => {
		this.initializeActivityLog();
	};

	//Get activity logs from database
	initializeActivityLog = () => {
		//Update state with activity logs and update the chart
		this.setState(
			{
				timescale: 'Week',
			},
			() => this.setChartTimeScale('Week'),
		);
	};

	//Sets the time scale for chart data granularity. Automatically renders one unit of past activity.
	setChartTimeScale = timescale => {
		let moment = require('moment');
		moment().format();
		let labels = [];
		let data = [];
		let cumulativeData = [];

		let numPoints, unit, format;
		if (timescale === 'Week') {
			numPoints = 7;
			unit = 'days';
			format = 'dddd';
		} else if (timescale === 'Month') {
			numPoints = 30;
			unit = 'days';
			format = 'MMM Do';
		} else if (timescale === 'Year') {
			numPoints = 12;
			unit = 'months';
			format = 'MMMM YY';
		}

		//Get number of points user has before time in question
		cumulativeData[0] = this.getInitialActivities(
			unit,
			moment().subtract(numPoints, unit),
		);
		console.log(cumulativeData[0]);

		//Get point accumulation over the time in question
		for (let i = 0; i < numPoints; i++) {
			labels[numPoints - i - 1] = moment()
				.subtract(i, unit)
				.format(format);
			data[i] = this.getNumActivities(
				unit,
				moment().subtract(numPoints - i - 1, unit),
			);
			if (i !== 0) {
				cumulativeData[i] = cumulativeData[i - 1] + data[i];
			}
		}

		//Update charts with the accumulation data
		this.updateChartData(labels, timescale, data, cumulativeData);
	};

	//A setstate wrapper to update the chartdata method.
	updateChartData = (labels, dataLabel, chartData, cumulativeData) => {
		this.setState({
			chartData: {
				labels: labels,
				datasets: [
					{
						label: dataLabel,
						data: chartData,
					},
				],
			},
			cumulativeData: {
				labels: labels,
				datasets: [
					{
						label: dataLabel,
						data: cumulativeData,
					},
				],
			},
		});
	};

	//Accesses the number of activities completed on the given number of the given timescale.
	//I.e. month 4 would return the number of activities completed 8 months ago.
	getNumActivities = (timescale, date) => {
		const moment = require('moment');
		return this.props.user_activities.filter(
			activity => moment(activity.updatedAt).diff(date, timescale) === 0,
		).length;
	};

	//Returns the number of activities completed before a given number of the given timescale.
	getInitialActivities = (timescale, date) => {
		const moment = require('moment');
		return this.props.user_activities.filter(
			activity => moment(activity.updatedAt).diff(date, timescale) <= 0,
		).length;
	};

	handleClick = e => {
		this.setState({
			timescale: e.target.id,
		});
		this.setChartTimeScale(e.target.id);
	};

	render() {
		return (
			<Container>
				<div className='TimeScaleSelect'>
					<Dropdown>
						<Dropdown.Toggle variant='info' id='dropdown-basic'>
							{this.state.timescale}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={this.handleClick} id='Week'>
								Week
							</Dropdown.Item>
							<Dropdown.Item
								onClick={this.handleClick}
								id='Month'
							>
								Month
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleClick} id='Year'>
								Year
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<Row>
					<Col>
						<Line
							className='ActivitiesPerTimeChart'
							data={this.state.chartData}
							options={{
								title: {
									display: true,
									text: 'Activities Per Time',
									fontSize: 25,
								},
								legend: {
									display: true,
									position: 'right',
								},
								scales: {
									yAxes: [
										{
											ticks: {
												min: 0,
												max:
													2 *
														this.state.chartData
															.datasets[0].data[
															this.state.chartData
																.datasets[0]
																.data.length - 1
														] +
													1,
												stepSize: 1,
											},
										},
									],
								},
								elements: {
									point: {
										radius: 0,
									},
								},
							}}
						/>
					</Col>
					<Col>
						<Line
							className='ActivitiesOverTimeChart'
							data={this.state.cumulativeData}
							options={{
								title: {
									display: true,
									text: 'Activities Over Time',
									fontSize: 25,
								},
								legend: {
									display: true,
									position: 'right',
								},
								scales: {
									yAxes: [
										{
											ticks: {
												min: 0,
												max:
													2 *
														this.state
															.cumulativeData
															.datasets[0].data[
															this.state
																.cumulativeData
																.datasets[0]
																.data.length - 1
														] +
													1,
												stepSize: 1,
											},
										},
									],
								},
								elements: {
									point: {
										radius: 0,
									},
								},
							}}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Charts;
