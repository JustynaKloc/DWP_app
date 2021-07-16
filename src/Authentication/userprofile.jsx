import React, { Component } from "react"
import "./userprofile.css"
import firebase from "firebase"
import FileUploader from "react-firebase-file-uploader";
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap'
import axios from 'axios'


class UserProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowHealth = this.handleShowHealth.bind(this);
    this.handleShowProfile = this.handleShowProfile.bind(this);
    this.handleShowDeleteUser = this.handleShowDeleteUser.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showDeleteUserModal = this.showDeleteUserModal.bind(this);
    this.authenticatePassword = this.authenticatePassword.bind(this);

    this.submitHealth = this.submitHealth.bind(this);

    this.state = {
      isSignedIn: false,
      showHealth: false,
      showProfile: false,
      showDeleteUser: false,
      showPassword: false,
      uid: "",
      photoURL: "",
      avatar: "",
      avatarURL: "",
      displayName: "",
      gender: "",
      username: "",
      email: "",
      f_name: "",
      l_name: "",
    };
  }

  handleClose() {
    this.setState({ showHealth: false });
    this.setState({ showProfile: false });
    this.setState({ showDeleteUser: false });
    this.setState({ showPassword: false });
  }

  showDeleteUserModal() {
    this.handleClose();
    this.handleShowDeleteUser();
  }

  authenticatePassword() {
        this.reauthenticate();
        this.handleClose();
        this.handleShowProfile();
  }

  handleShowHealth() {
    this.setState({ showHealth: true });
  }

  handleShowProfile() {
    this.setState({ showProfile: true });
  }

  handleShowDeleteUser() {
    this.setState({ showDeleteUser: true });
  }

  handleShowPassword() {
    this.setState({ showPassword: true });
  }

  submitHealth() {
    axios.post('http://localhost:3210/api/editProfile', {
      uid: firebase.auth().currentUser.uid,
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      gender: document.getElementById("editGender").value
    })
    .then(res => {
      // let data = res.data;
      window.location.reload();
    }).catch(err => {
      // alert("Check If you have a data in the user table.");
      console.log(err);
    });

    this.handleClose();
  }

  reauthenticate = (currentPassword) => {
    currentPassword = document.getElementById("currentUPassword").value;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword = (currentPassword, newPassword) => {

    currentPassword = document.getElementById("currentUserPassword").value;
    // console.log(currentPassword);
    var newPasswordOne = document.getElementById("newPasswordOne").value;
    var newPasswordTwo = document.getElementById("newPasswordTwo").value;
    // var newEmail = document.getElementById("newEmail").value;

    var user = firebase.auth().currentUser;
    var credential;

    if (currentPassword !== "") {
      // Prompt the user to re-provide their sign-in credentials

      credential = firebase.auth.EmailAuthProvider.credential(
          user.email, currentPassword);

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        // User re-authenticated.
        if (newPasswordOne !== "") {
          if (newPasswordOne === newPasswordTwo) {
            user.updatePassword(newPasswordOne).then(function() {
              // Update successful.
              alert("Password Updated!");
              // this.handleClose();
            }).catch(function(error) {
              // An error happened.
              alert(error);
            });

          } else {
            alert("Passwords Do Not Match.")
          }
        }
      }).catch(function(error) {
        // An error happened.
        alert(error);
      });
    } else {
      alert("Please Enter Current Password!")
    }

    // this.handleClose();

  }

  deleteAccount = (currentPassword) => {
    currentPassword = document.getElementById("currentPasswordDeleteAccount").value;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
        var user = firebase.auth().currentUser;
        user.delete().then(() => {
          window.location.href = "/";
          alert("Account Deleted!");
        }).catch((error) => { });
    }).catch(function(error) {
      alert("Incorrect Password!");
    });
  }

  handleUploadSuccess = filename => {
    var user = firebase.auth().currentUser;
    this.setState({ avatar: filename });
    firebase.storage().ref("images").child(filename).getDownloadURL().then(url => user.updateProfile({
      photoURL: url
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    }));
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      this.setState({ photoURL: firebase.auth().currentUser.photoURL })
      this.setState({ displayName: firebase.auth().currentUser.displayName })
    });

    axios.post('http://localhost:3210/api/getUserData', {uid: firebase.auth().currentUser.uid})
		.then(res => {
			let data = res.data;
      this.setState({
				username: data.username,
				email: data.email,
				f_name: data.f_name,
				l_name: data.l_name,
        gender: data.gender,
        uid: firebase.auth().currentUser.uid
			});
    }).catch(err => {
			// alert("Check If you have a data in the user table.");
			console.log(err);
		});


  }


  render() {
    return (
      <Container className="mainDisplay">
        <Row>
          <Col lg={5} className="profPic">
            {
                <img height="300px" src={require("../Images/p1.png")} alt="User Avatar" />
            }

          </Col>

          <Col className="shadow-lg p-3 mb-5 bg-white contentDiv" lg={6}>
            <h3 className="name"> {firebase.auth().currentUser.displayName} </h3>
            <h6 className="email"> {firebase.auth().currentUser.email} </h6>

            <Row className="displayInfo">
              <Col>
                <h6>Friends</h6>
                <Col>
                  <h4>1</h4>
                </Col>
              </Col>
              <Col>
                <h6>Workouts</h6>
                <Col>
                  <h4>12</h4>
                </Col>
              </Col>
              <Col>
                <h6>Achievements</h6>
                <Col>
                  <h4>16</h4>
                </Col>
              </Col>
            </Row>

            <Row className="editButton">
              <Col lg={3}>
              </Col>
              <Col lg={3}>
                <Button variant="primary" onClick={this.handleShowProfile}>
                    Edit Profile
                </Button>
              </Col>
              <Col lg={3}>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>


          <Col>
          </Col>

        </Row>


          <Modal show={this.state.showHealth} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Health Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                   <Form.Control id="editHeight" type="" placeholder="Height" defaultValue={this.state.height} />

                </Form.Group>

                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <Form.Control id="editWeight" type="" placeholder="Weight" defaultValue={this.state.weight} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control id="editAge" type="" placeholder="Enter Age" defaultValue={this.state.age} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control id="editGender" as="select" defaultValue={this.state.gender} >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.submitHealth}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={this.state.showProfile} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
              <Form>
                <Form.Group>

                  <Row className="formPadding">
                    <Col>
                      <Form.Label>Enter Current Password</Form.Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Control required id="currentUserPassword" type="password" placeholder="Enter Current Password"/>
                    </Col>
                  </Row>
                  <Row className="formPadding">
                    <Col>
                      <Form.Label>Change Password</Form.Label>
                    </Col>
                  </Row>
                  <Row className="formPadding">
                    <Col>
                      <Form.Control id="newPasswordOne" type="password" placeholder="Enter New Password" />
                    </Col>
                  </Row>
                  <Row className="formPaddingOne">
                    <Col>
                      <Form.Control id="newPasswordTwo" type="password" placeholder="Re-Enter New Password" />
                    </Col>
                  </Row>

                  <Row className="formPaddingThree text-center">
                    <Col>
                      <label style={{backgroundColor: 'blue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                        Upload Avatar
                        <FileUploader
                          hidden
                          accept="image/*"
                          filename={file => firebase.auth().currentUser.uid + file.name.split('.')[1]}
                          storageRef={firebase.storage().ref('images')}
                          onUploadSuccess={this.handleUploadSuccess}
                        />
                      </label>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={this.showDeleteUserModal}>
              Delete Account
            </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.changePassword}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showDeleteUser} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> Note: This action cannot be undone. All fitness data will be lost.</p>
              <Form.Control id="currentPasswordDeleteAccount" type="password" placeholder="Enter Current Password" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Nevermind
              </Button>
              <Button variant="danger" onClick={this.deleteAccount}>
                Delete Account
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showPassword} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control id="currentPassword" type="password" placeholder="Enter Current Password" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.authenticatePassword}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

      </Container>
    )
  }
}

export default UserProfile
