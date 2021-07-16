import React, { Component } from 'react'
import axios from 'axios'

class Sample extends Component {
	constructor(props) {
		super(props);
		// Need to be the uid of myself. It should be remembered somewhere. e.g. token
		this.state = {
      uid: 1,
      username: '',
      f_name: '',
      l_name: '',
      email: '',
      age: 0,
      weight: 0,
      height: 0
		};
	}

  componentDidMount = () => {
    axios.post('http://localhost:3210/api/getUserData', {uid: this.state.uid})
		.then(res => {
			let data = res.data;
      this.setState({
				username:data.username,
				email: data.email,
				f_name: data.f_name,
				l_name: data.l_name,
				height: data.height,
				weight: data.weight,
				age: data.age
			});
    }).catch(err => {
			alert("Check If you have a data in the user table.");
			console.log(err);
		});
  }

	render() {
		return (
			<div className='container'>
				<table className='myInfo'>
          <tr>
            <td>Username</td>
            <td>{this.state.username}</td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td>{this.state.f_name} {this.state.l_name}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{this.state.age}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{this.state.height}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{this.state.weight}</td>
          </tr>
        </table>

			</div>
		);
	}
}

export default Sample;
