import React, {Component} from 'react'
import {Panel, Button,Glyphicon,Row,Col, Image,Media,small} from 'react-bootstrap'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'


class Comments extends Component{
	constructor(props){
		super(props);
		this.handleChange=this.handleChange.bind(this)
		console.log(this.counter)
	}
	handleChange(e){
		this.counter=e.target.value.length;
		this.forceUpdate()
	}
	render(){
	return (
		<Panel>
			<Panel.Heading>
				<Row>
					<Col xsHidden sm="1" style={{lineHeight:'30px',}}>	
						<b style={{verticalAlign:'middle'}}>Comments</b>
					</Col>
					<Col xs='6' sm="3" smOffset="8" mdOffset="7" lgOffset="8">
						<Button style={{}} onClick={this.props.handleCommentSubmit}>
							<Glyphicon glyph='send' />{' '}
							Post Comment...
						</Button>
					</Col>
				</Row>
			</Panel.Heading>
			<Panel.Body>
				<form onSubmit={this.props.handleCommentSubmit}>
					<FormGroup  >
						<ControlLabel>What's your thought</ControlLabel>{' '}
						<small >
							({this.counter===undefined?90: 90-this.counter} 
							{' '}characters left)
						</small>
						<FormControl
							id="postComment"
							type="text"
							placeholder="Enter text"
							onChange={this.handleChange}
						/>
					</FormGroup>
				</form>
				{this.props.CommentData.map(each=>(
					<Media>
						<Media.Left>
							<Image width="64" circle 
							src={each.avatar}
							/>
						</Media.Left>
						<Media.Body>
							<p style={{overflow:"auto"}}>{each.comment}</p>
							<b>{each.name}{' '}</b><small>posted on {each.date}</small><hr/>
						</Media.Body>
					</Media>
				))}
				
			</Panel.Body>
		</Panel>
	)
	}
} 
export default Comments