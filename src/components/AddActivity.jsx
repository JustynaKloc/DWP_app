import React, { Component } from 'react'
import axios from 'axios'
import "../index.css"
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import firebase from "firebase"

class AddActivity extends Component {

  constructor(props, context) {
    super(props, context);

    this.activityTypeChoose = this.activityTypeChoose.bind(this);
    this.saveActivity = this.saveActivity.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.submitActivity = this.submitActivity.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      uid: '',
      type: '',
      duration: '',
      points: '',
      updatedAt: ''
    };
  }

  componentDidMount = () => {
    axios.post('http://localhost:3210/api/getUserData', {uid: firebase.auth().currentUser.uid})
    .then(res => {
      let data = res.data;
      this.setState({
        weight: data.weight
      });
    }).catch(err => {

      console.log(err);
    });


  }

  submitActivity() {
    let curPoints;
    let newPoints = {
      uid: '',
      totalpoints: ''
    };
    axios.post('http://localhost:3210/api/getPoints', this.state)
      .then(res => {
        curPoints = res.data;
        newPoints.uid = this.state.uid;
        newPoints.totalpoints = curPoints.totalpoints + this.state.points;
        axios.post('http://localhost:3210/api/updatePoints',newPoints)
          .then(res => console.log(res.data));
    });
    axios.post('http://localhost:3210/api/addStat', this.state)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

    handleHide(){

        document.getElementById("duration").style.display = "none";
        document.getElementById("distance").style.display = "none";

    }

  activityTypeChoose(){

      document.getElementById("duration").style.display = "none";
      document.getElementById("distance").style.display = "none";

    if(document.getElementById("type") === "Running" || document.getElementById("type") === 'Cycling' || document.getElementById("type") === 'Walking' || document.getElementById("type") === 'Hiking' ||
    this.state.type === "Swimming" || document.getElementById("type") === 'Mountain Biking' ||  document.getElementById("type") === "Spinning (indoor bike classes)") {
        document.getElementById("distance").style.display = "none";
        document.getElementById("duration").style.display = "none";}
     else{
        document.getElementById("duration").style.display = "block";
        document.getElementById("distance").style.display = "block";
    }

  }

//       handleChange(event){
//        var x = document.getElementById("duration");
//        var y = document.getElementById("distance");
//        x.style.display = "none";
//        y.style.display = "none";
//        }

  calculatePoints() {
    console.log(this.state);

    let points = 0;

    if(this.state.name === '') {
      alert('No Activity Name entered!')
      return
    }

    else if(this.state.duration <= 0) {
      alert('No Activity Duration entered!')
      return
    }
    else if( ( this.state.type === 'Running' ||
                this.state.type === 'Biking' ||
                this.state.type === 'Swimming' ) &&
                this.state.distance <= 0) {
      alert('No Activity Distance entered!')
      return
    }
    else if(this.state.type === 'Running') {
      points = this.state.duration * 2;
      alert('Points Earned: ' + points)
    }
    else if(this.state.type === 'Cycling') {
      points = this.state.duration * 1;
      alert('Points Earned: ' + points)
    }
    else if(this.state.type === 'Hiking') {
      points = this.state.duration * 1.75;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Walking') {
      points = this.state.duration * 1.5;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Swimming') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Spinning (indoor bike classes)') {
      points = this.state.duration * 1;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Mountain Biking') {
      points = this.state.duration * 1.5;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'American Football') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Archery') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Badminton') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Basketball') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Bowling') {
      points = this.state.duration * 2;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Boxing') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Circuit Training') {
      points = this.state.duration * 15;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Climbing') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Cricket') {
      points = this.state.duration * 2;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Cross Training') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Crossfit') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Dance/Zumba') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Diving') {
      points = this.state.duration * 5;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Football') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Golf') {
      points = this.state.duration * 2;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Gymnastics') {
      points = this.state.duration * 10;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Handball') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'HIIT') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Hockey') {
      points = this.state.duration * 10;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Horse Riding') {
      points = this.state.duration * 5;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Ice-skating') {
      points = this.state.duration * 10;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Judo') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Kayaking') {
      points = this.state.duration * 10;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Martial Arts') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Netball') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Paddle Boarding') {
      points = this.state.duration * 3;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Pilates') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Pole Dance') {
      points = this.state.duration * 14;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Rollerskating') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Rope Skipping') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Rowing') {
      points = this.state.duration * 20;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Rugby') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Skateboard') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Skiing') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Snowboard') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Squash') {
      points = this.state.duration * 15;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Stepping') {
      points = this.state.duration * 15;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Surfing') {
      points = this.state.duration * 7;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Table Tennis') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Tennis') {
      points = this.state.duration * 10;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Trampoline') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Volleyball') {
      points = this.state.duration * 9;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Weight Lifting') {
      points = this.state.duration * 12;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Wheelchair Sports') {
      points = this.state.duration * 15;
      alert('Points Earned : ' + points)
    }
    else if(this.state.type === 'Water Skiing') {
      points = this.state.duration * 5;
      alert('Points Earned : ' + points)
    }
        else if(this.state.type === 'Yoga') {
          points = this.state.duration * 7;
          alert('Points Earned : ' + points)
        }

    else {
      alert('Error!!')
      return
    }


    this.setState({
      points: points
    }, function() {
      this.activityTypeChoose();
      this.submitActivity();
    });
  }


  saveActivity() {
    this.setState({
      uid: firebase.auth().currentUser.uid,
      type: document.getElementById("type").value,
      duration: document.getElementById("duration").value,
      updatedAt: new Date().toLocaleString()
    }, function() {
      this.calculatePoints();
    });
  }

  render() {

// 		const style = this.state.duration ? {display:'none'} : {};
// 		const style1 = this.state.distance ? {display:'none'} : {};

		return (

      <Container className="addActivityDisplay">
      <Row className="shadow-lg p-3 mb-5 bg-white contentDiv">
      <Col>
        <h1>Add New Activity</h1>
        <Form>
          <Form.Group>
            <Form.Label>Activity Type</Form.Label>
            <Form.Control id="type" as="select" defaultValue={this.state.type} onClick={this.handleHide} >
            <option>Running</option>
            <option>Cycling</option>
            <option>Swimming</option>
            <option>Walking</option>
            <option>Hiking</option>
            <option>Mountain Biking</option>
            <option>Spinning (indoor bike classes)</option>
            <option>American football</option>
            <option>Archery</option>
            <option>Badminton</option>
            <option>Basketball</option>
            <option>Bowling</option>
            <option>Boxing</option>
            <option>Circuit Training</option>
            <option>Climbing</option>
            <option>Cricket</option>
            <option>Cross Training</option>
            <option>Crossfit</option>
            <option>Dance/Zumba</option>
            <option>Diving</option>
            <option>Football</option>
            <option>Golf</option>
            <option>Gymnastics</option>
            <option>Handball</option>
            <option>HIIT</option>
            <option>Hockey</option>
            <option>Horse Riding</option>
            <option>Ice-skating</option>
            <option>Judo</option>
            <option>Kayaking</option>
            <option>Martial Arts</option>
            <option>Netball</option>
            <option>Paddle Boarding</option>
            <option>Pilates</option>
            <option>Pole dance</option>
            <option>Rollerskating</option>
            <option>Rope Skipping</option>
            <option>Rowing</option>
            <option>Rugby</option>
            <option>Skateboard</option>
            <option>Skiing</option>
            <option>Snowboard</option>
            <option>Squash</option>
            <option>Stepping</option>
            <option>Surfing</option>
            <option>Table Tennis</option>
            <option>Tennis</option>
            <option>Trampoline</option>
            <option>Volleyball</option>
            <option>Water Skiing</option>
            <option>Weight Lifting</option>
            <option>Wheelchair Sports</option>
            <option>Yoga</option>

            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Button variant="primary" onClick={this.activityTypeChoose}>
            OK
          </Button>
          </Form.Group>

          <Form.Group>
            <Form.Control id="duration" type="" placeholder="enter duration"  defaultValue={this.state.duration} />
          </Form.Group>
          <Form.Group>
            <Form.Control id="distance" type="" placeholder="enter distance" defaultValue={this.state.duration} />
          </Form.Group>

          <Button variant="primary" onClick={this.saveActivity}>
            Save Activity
          </Button>

        </Form>
        </Col>
        </Row>
      </Container>
		);
	}
}

export default AddActivity;
