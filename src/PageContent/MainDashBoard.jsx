import React, { Component } from "react"
import "./MainDashBoard.css"
import firebase from "firebase"
import { Container, Row, Col } from 'react-bootstrap'



class MainDashBoard extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
        isSignedIn: false,
        userDisplayName: "",
      }


  }
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      this.setState({userDisplayName: firebase.auth().currentUser.displayName})

    })
  }

  render() {
    return (

      <Container className="contentDiv">
        <Row>
          <Col className="shadow-lg p-3 mb-5 bg-white" lg={8}>
            <h4>Welcome,
              {" " + firebase.auth().currentUser.displayName}
            </h4>
            <h6>
              Today's completed activity:
            </h6>
            <Row className="activityList">
              <Col>
                <p> You haven't completed any activity today! </p>
              </Col>

            </Row>
          </Col>

        </Row>

      </Container>

    )
  }
}

export default MainDashBoard
