
import React, { Component } from 'react'
import axios from 'axios'
import "../index.css"
// import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
// import firebase from "firebase"

const Group = props => (
    <tr>
        <td>{props.group.g_name}</td>
        <td>{props.group.groupdist}</td>
    </tr>
)

class Leaderboard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {users: [],
      direction: {
        groupdist:'desc',
      }

  };
this.onSort=this.onSort.bind(this);
this.sortByPoints = this.sortByPoints.bind(this);
}

  componentDidMount() {
      axios.post('http://localhost:3210/api/getDistance')
          .then(response => {
              this.setState({ users: response.data });
          })
          .catch(function (error){
              console.log(error);
          })
  }

  onSort(event, key) {
    this.setState({
      users: this.state.users.sort( (a, b) => (
        this.state.direction[key] === 'desc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      )),
      direction: {
        [key]: this.state.direction[key] === 'desc'
          ? 'asc'
          : 'desc'
      }
    })
  }

  sortByPoints(event, key) {
    this.setState({
      users: this.state.users.sort( (a, b) => (
        this.state.direction[key] === 'desc'
          ? b[key] - a[key]
          : a[key] - b[key]
      )),
      direction: {
        [key]: this.state.direction[key] === 'desc'
          ? 'asc'
          : 'desc'
      }
    })
  }

  userList() {
    this.state.users.sort((a, b) => b.groupdist - a.groupdist);
      return this.state.users.map(function(currentUser, i){
          return <Group.groupdist user={currentUser} key={i} />;
      })
  }


  render() {
    var newusers=this.state.users;
		return (
      <Container className="LeaderboardDisplay">
        <Row className="shadow-lg p-3 mb-5 bg-white">
          <Col>
              <h1>Leaderboard</h1>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                  <thead>
                      <tr>
                          <th onClick={e=>this.onSort(e, 'g_name')}>Group</th>
                          <th onClick={e=>this.sortByPoints(e, 'groupdist')}>Total Distance</th>
                      </tr>
                  </thead>
                  <tbody>
                    {newusers.map(function(currentUser, i){
                      return(
                        <tr key={i} data-item={currentUser}>
                          <td data-title="Group">{currentUser.g_name}</td>
                          <td data-title="Total Distance">{currentUser.groupdist}</td>
                        </tr>

                      );
                    })}
                  </tbody>
              </table>
            </Col>
          </Row>
      </Container>
		);
	}
}

export default Leaderboard;
