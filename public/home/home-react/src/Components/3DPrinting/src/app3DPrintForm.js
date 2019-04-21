import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
var fill = false;

export default class Example extends React.Component {

  constructor(props){
    super(props);

    this.state={
      name : "",
      color : "",
      url: "",
      projectType: "",
      contact: "",
      comment: "",
      filled : false
    }
  }

  handleNameChange(e){
    this.setState({ name: e.target.value})
  }
  handleColorChange(e){
    this.setState({ color: e.target.value})
  }
  handleUrlChange(e){
    this.setState({ url: e.target.value})
  }
  handleProjectTypeChange(e){
    this.setState({ projectType: e.target.value})
  }
  handleContactChange(e){
    this.setState({ contact: e.target.value})
  }
  handleCommentChange(e){
    if (e.target == null){this.setState({ comment: "N/A"})}
    else{this.setState({ comment: e.target.value})}
  }
  handlefilled(e){
    this.setState({ filled: e}, function(){console.log(this.state.filled)})
  }

  submitApplication(e){

  fill = true;

  if(this.state.name.length===0){
    alert( "You must provide your full name!" );
    fill = false;
  }
  else if(this.state.color.length===0 || this.state.color == "Select Color"){
    alert( "You must provide a color" );
    fill = false;
  }
  else if(this.state.url.length===0){
    alert( "You must provide a url" );
    fill = false;
  }
  else if(this.state.projectType.length===0){
    alert( "You must provide your type of project" );
    fill = false;
  }
  else if(this.state.contact.length===0){
    alert( "You must provide a contact" );
    fill = false;
  }

  if(fill==true){
    var request = require( 'superagent' );
	            var page = this;
	            request.post(
	                'http://' +
	                window.location.hostname +
	                ':3000/api/3DPrintingForm/submit'
	            ).set('Content-Type', 'application/json;charset=utf-8')
	            .send( {
	                name: this.state.name,
	                color: this.state.color,
	                comment: this.state.comment,
	                contact: this.state.contact,
	                projectType: this.state.projectType,
                  url: this.state.url
	            } )
	            .end( function( err, response ){

	                if( response && response.status < 300 ){

	                    // Create a copy of the current state
	                    var tempState = Object.assign( this.state );

	                    // Modify state to signal a close of the form,
	                    // and a reveal of a success message that provides the user
	                    // with further instructions
	                    tempState.successfullyApplied = true;

	                    // Set state
	                    this.setState( tempState );
	                } else {

	                    // Failure
	                    // TODO: Respond with error
	                    alert( "(X.X)\tA submission error occurred. Please contact the site administrator" );
	                    console.error( err );
	                }
	            }.bind(this) );
	        }
          this.setState({ filled: true})
	        return;


  }


  render() {
    return (
<div>

  { fill == false ?

      <Container>
      <Form>
      <br></br>

      <br></br>


          <FormGroup>
          <Row>
          <Col ><Label for="name">Full Name</Label></Col>
          <Col><Label for="colors"> What color would you like your print to be?</Label></Col>
          </Row>

          <Row>
          <Col><Input type="text" name="name" id="name" placeholder="Enter Full Name"
          onChange={this.handleNameChange.bind(this)}/></Col>

          <Col><Input type="select" name="colors" id="colors"
          onChange={this.handleColorChange.bind(this)}>
            <option>Select Color</option>
            <option>Any Color</option>
            <option>Black</option>
            <option>Blue</option>
            <option>Brown</option>
            <option>Green</option>
            <option>Grey</option>
            <option>Orange</option>
            <option>Red</option>
            <option>Pink</option>
            <option>Purple</option>
            <option>Yellow</option>
            <option>White</option>
            <option>Clear</option>

          </Input></Col>
         </Row>
         </FormGroup>

        <FormGroup>
        <Row>

          <Col ><Label for="project">Is this for a school project or a personal project? <br></br>(If a personal project, please explain what it's for)</Label></Col>
          <Col><Label for="url">Please copy the link to the .stl file you would like printed. (NOTE: Maximum print dimensions are 25 x 21 x 21 cm) </Label> </Col>
        </Row>


        <Row>

          <Col><Input onChange={this.handleProjectTypeChange.bind(this)}
          type="text" name="projectType" id="projectType" placeholder="Type of Project" /></Col>
          <Col><Input onChange={this.handleUrlChange.bind(this)}
          type="url" name="url" id="url" placeholder="Link to Project File" /></Col>
        </Row>

        </FormGroup>


        <FormGroup>

        <Row>
          <Col>
          <Label for="contact">How would you like to be contacted? (Phone number, email, etc)</Label>
          </Col>
       </Row>

       <Row>
         <Col>
           <Input onChange={this.handleContactChange.bind(this)}
           type="text" name="contact" id="contact" placeholder="Contact Information" />
         </Col>
       </Row>
       </FormGroup>



       <FormGroup>
          <Label for="comments"> Do yo have any special comments or requests we should know about?</Label>
          <Input onChange={this.handleCommentChange.bind(this)} value={this.state.comment}
          type="text" name="comments" id="comments" placeholder="Comments" />
          </FormGroup>

        <FormGroup>
           <Button color="primary" onClick={this.submitApplication.bind(this)}>Submit</Button>
        </FormGroup>

      </Form>
      </Container>

      : null}

{   fill == true ?
	                    ( <div>
	                        <h3 style={ { margin: "1em" } }>
	                            Your application has been submitted!
	                        </h3>
	                        <p style={ { margin: "2em" } }>
	                            You may now return to the homepage!
	                        </p>
	                    </div> ) : null
	                }
</div>
    );
  }
}
