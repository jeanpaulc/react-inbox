import React, { Component } from 'react'

class ComposeForm extends Component {

  state = {
    subject: "",
    body: ""
  }

  handleSubjectChange = (e) => {
    this.setState({ subject: e.target.value })
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const { onMsgSubmit } = this.props
    const { subject, body } = this.state
    onMsgSubmit({ subject, body })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="to" className="col-sm-2 control-label">To</label>
          <div className="col-sm-8">
            <input value="Yourself" type="text" className="form-control" id="to" name="subject" disabled={true}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input value={this.state.subject} onChange={this.handleSubjectChange} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea value={this.state.value} onChange={this.handleBodyChange} name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    )
  }
}

export default ComposeForm