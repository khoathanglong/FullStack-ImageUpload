import React, {Component} from 'react';
import {Row,FormGroup, ControlLabel, Form, FormControl, Button, Col,InputGroup, Panel} from 'react-bootstrap'
class UploadForm extends Component {
	constructor(props){
		super(props);
	}
	render(){
	return (
		<Panel bsStyle="primary">
			<Panel.Heading >
				Upload an Image
			</Panel.Heading>
			<Panel.Body>
				<Form horizontal onSubmit={this.props.handleUpload} >
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel} >
							Browse:
						</Col>
						<Col sm={10}>
							<Panel  style={{margin:'0'}} >
										<FormControl 
										 // ref={input => {
          									 // this.fileInput = input;//must use input to use ref
          										//}}
										id="fileUpload"
										type="file" 
										style={{padding:'10px'}} />			
							</Panel>												
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel} >
							Title:
						</Col>
						<Col sm={10}>
							<FormControl id="title"
							type="text"
							 />
						</Col>
					</FormGroup>
					<FormGroup  >
						<Col sm={2} componentClass={ControlLabel} >
							Description: 
						</Col>
						<Col sm={10} >
							<FormControl id="description" 
							bsSize="lg" 
							type="text" 
							 /><br/>
							<Button 
								bsStyle="primary"
								type="submit">Upload
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</Panel.Body>
		</Panel>
				
	)}
}
export default UploadForm