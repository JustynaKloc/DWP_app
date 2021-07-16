import React, { Component } from "react"
import firebase from "firebase"
import axios from 'axios'
import "./newuser.css"
import { Container, Row, Col, Form, Button} from "react-bootstrap"

class NewUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.submitProfile = this.submitProfile.bind(this);
    this.saveProfile = this.saveProfile.bind(this);

    this.state = {
      uid: "",
      username: "",
      f_name: "",
      l_name: "",
      age: "",
      weight: "",
      height: "",
      gender: "",
      totalpoints: 0
    };
  }

  submitProfile() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: document.getElementById("editFirstName").value + " " + document.getElementById("editLastName").value
    });
    axios.post('http://localhost:3210/api/createAccount', this.state)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  saveProfile() {
    this.setState({
        uid: firebase.auth().currentUser.uid,
        username: document.getElementById("editUsername").value,
        f_name: document.getElementById("editFirstName").value,
        l_name: document.getElementById("editLastName").value
    }, function() {
      this.submitProfile();
    });
  }

  render() {
    return (
      <Container className="contentDiv">
        <Row className="shadow-lg p-3 mb-5 bg-white">
          <Col>
            <h4>Create Profile</h4>
            <Row>
              <Col>
              </Col>
              <Col lg={6}>
                <Form>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required id="editFirstName" type="username" placeholder="Enter First Name"/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required id="editLastName" type="username" placeholder="Enter Last Name"/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control required id="editUsername" type="username" placeholder="Enter a Username"/>
                </Form.Group>

                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control required id="editGender" as="select">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Button type="primary" onClick={this.saveProfile}>Submit</Button>
            </Col>

            <Col>
            </Col>
            </Row>
          </Col>
        </Row>
      </Container>

    )
  }
}

export default NewUser
