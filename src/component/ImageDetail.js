import React, { Component } from 'react'
import {Panel, Image,Button,Glyphicon } from 'react-bootstrap'
import Comment from './Comments.js'

class ImageDetail extends Component {
	constructor(props){
		super(props);
		// this.state={ImageDetail:props.ImageDetail, liked:false};//each Image has its own state
		// this.handleLike=this.handleLike.bind(this);
		// this.handleCommentSubmit=this.handleCommentSubmit.bind(this)
	}
	// componentDidMount(){
	// 	this.setState(preState=>{
	// 		return {ImageDetail:{...preState.ImageDetail,view:preState.ImageDetail.view+1}}
	// 	})
	// }
	componentDidUpdate(preProps,preState){
		// if (preState.ImageDetail.like!==this.state.ImageDetail.like){
			// fetch('/image/updateLike',{
			// 	method:"POST",
			// 	headers:{'Accept':'application/json','Content-Type': 'application/json'},
			// 	//Content-type needed to get req.body in the server
			// 	body:JSON.stringify(this.state.ImageDetail)
			// }).catch(err=>{console.log('like/comment/view err:', err)})
		// }
	}

	// handleLike(){
	// 	if (!this.state.liked){
	// 		this.setState(preState=>{
	// 			return {ImageDetail:{...preState.ImageDetail,
	// 								like:preState.ImageDetail.like+1},
	// 					liked:!preState.liked}
	// 		})
	// 	}else{
	// 		this.setState(preState=>{
	// 			return {ImageDetail:{...preState.ImageDetail,
	// 								like:preState.ImageDetail.like-1},
	// 					liked:!preState.liked}
	// 		})
	// 	}	
		
	// }

	// handleCommentSubmit(e){
	// 	e.preventDefault();
	// 	let text =document.getElementById('postComment').value
	// 	if(text==="") {return}
	// 	if (text.length>90)
	// 		{	
	// 			alert('your comment should less than 90 charaters'); 
	// 			return
	// 		}
	// 	let comment={comment:text,
	// 				name:'spiderman',
	// 				avatar:'http://localhost:3001/upload/1517224582889&untitled.png',
	// 				date:0
	// 				};
	// 	this.setState(preState=>{
	// 			return {ImageDetail:{...preState.ImageDetail,
	// 								comment:[comment].concat(preState.ImageDetail.comment)
	// 								}
	// 					}
	// 		})
	// 	fetch('/image/updateComment',{
	// 			method:"POST",
	// 			headers:{'Accept':'application/json','Content-Type': 'application/json'},
	// 			//Content-type needed to get req.body in the server
	// 			body:JSON.stringify({...comment,_id:this.state.ImageDetail._id})
	// 			//add the id to the POST to find document to update in the mongo server
	// 		})
	// 		.catch(err=>{console.log('like/comment/view err:', err)})
	// 	document.getElementById('postComment').value=""
	// }

	render(){
	return (
	<div>	
		<Panel bsStyle="primary">
			<Panel.Heading >
				<b>{this.props.ImageDetail.title}</b>
			</Panel.Heading>
			<Panel.Body>
				<Image responsive thumbnail 
				src={this.props.ImageDetail.url}  
				style={{}}
				/>
			</Panel.Body>
			<Panel.Footer>
				<Button bsStyle="success" onClick={this.props.handleLike}  >
					<Glyphicon glyph="heart"/>
					<span> Like</span>
				</Button>{' '}
				<span style={{verticalAlign:'middle', marginRight:'20px'}}>{this.props.ImageDetail.like}</span>
				<span style={{marginRight:'20px'}}>-</span>
				<Glyphicon style={{verticalAlign:'middle'}} glyph="eye-open"/> {' '}
				<span style={{verticalAlign:'middle',marginRight:'20px'}}>{this.props.ImageDetail.view}</span>{''} 
				<span>Posted on: <i>{this.props.ImageDetail.date}</i></span>
			</Panel.Footer>

		</Panel>
		<Comment CommentData={this.props.ImageDetail.comment} 
			 	handleCommentSubmit={e=>this.props.handleCommentSubmit(e)}
			 	/>
		
	</div>	
	)
	}
}
export default ImageDetail