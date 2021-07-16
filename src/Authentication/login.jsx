import React, { Component } from "react"
// import "../App.css"
import "./login.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Button, Container, Row, Col, Form } from 'react-bootstrap'

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSignedIn: false,
    };
  }

  doSignInWithEmailAndPassword = (email, password) => {
    email = document.getElementById("enterEmail").value;
    password = document.getElementById("enterPass").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
        alert("Invalid Email or Password");
    });
    this.props.history.push('/');
}

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID

    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() {
    return (
      <div className="App">
            {this.state.isSignedIn ? (
              <span>
                <div><h2>Signed In!</h2></div>
                <h2>Welcome {firebase.auth().currentUser.displayName}</h2>
                <Button variant="primary" onClick={() => firebase.auth().signOut()}>Sign out!</Button>
              </span>
            ) : (
                <Container className="rounded">
                  <Row>
                    <Col>
                    </Col>
                  </Row>

                  <Row className="contentDiv">

                    <Col lg={2}>
                    </Col>
                    <Col lg={4} className="shadow-lg p-3 mb-5 bg-white">
                      <h4>Login</h4>
                      <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                      <Form>
                        <Form.Group>
                          <Form.Control id="enterEmail" type="username" placeholder="Enter Email"/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Control id="enterPass" type="password" placeholder="Enter Password"/>
                        </Form.Group>
                      </Form>
                      <Button variant="primary" onClick={this.doSignInWithEmailAndPassword}>Login</Button>
                    </Col>
                    <Col lg={4} className="shadow-lg p-3 mb-5 bg-white learnMore">
                      <h4>Welcome to the Digital Workout Programme App!</h4>
                      <p>Please sign in or register to use this website</p>
                      <Button variant="primary" href="/register">
                          Register
                      </Button>

                    </Col>
                  </Row>

                </Container>
            )}
      </div>
    )
  }
}

export default Login
