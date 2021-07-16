import React, { Component } from "react"
import "../App.css"
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import firebase from "firebase"



class NavBar extends Component {

  constructor(props, context) {
    super(props, context);

    this.signOut = this.signOut.bind(this);

    this.state = { isSignedIn: false }

}

  signOut() {
    this.setState({isSignedIn: false});
    firebase.auth().signOut();
    window.location.href = "/";
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() {
    return (
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Digital Workout Programme</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href={"/userdash/" + firebase.auth().currentUser.uid}>Dashboard</Nav.Link>
                <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                <Nav.Link href="/groups">Groups</Nav.Link>
                <Nav.Link href="/addactivity">Add Activity</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
            {this.state.isSignedIn ? (
              <span>
              <Nav className="mr-auto">
                <NavDropdown title={firebase.auth().currentUser.displayName} id="basic-nav-dropdown">
                 <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                 <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item onClick={this.signOut}>Sign Out</NavDropdown.Item>
               </NavDropdown>
              </Nav>
              </span>
            ) : (
              <div>
                <Navbar.Text>
                  <Button variant="primary" href="/login">Login</Button>
                </Navbar.Text>
              </div>
            )}
            </Navbar.Collapse>
          </Navbar>

        </div>
    )
  }
}

export default NavBar
