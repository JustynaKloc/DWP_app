import React, { Component } from "react"
import Button from 'react-bootstrap/Button'

class LearnMore extends Component {
  render() {
    return (
      <div className="App">
        <p>You've learned more!</p>
        <Button variant="primary" href="/">
            Back to Login
        </Button>
      </div>
    )
  }
}

export default LearnMore
