import React, { Component } from 'react'
import {Panel, Image,Button,Glyphicon } from 'react-bootstrap'
import Comment from './Comments.js'

class ImageDetail extends Component {
	constructor(props){
		super(props);
		this.state={ImageDetail:props.ImageDetail, liked:false};//each Image has its own state
		this.handleLike=this.handleLike.bind(this);
		this.handleCommentSubmit=this.handleCommentSubmit.bind(this)
	}
	componentDidMount(){
		this.setState(preState=>{
			return {ImageDetail:{...preState.ImageDetail,view:preState.ImageDetail.view+1}}
		})
	}
	componentDidUpdate(preProps,preState){
		if (preState.ImageDetail!==this.state.ImageDetail){
			fetch('/updateImageDetail',{
				method:"POST",
				headers:{Accept:'application/json'},
				body:JSON.stringify(this.state.ImageDetail)
			}).catch(err=>{console.log('like/comment/view err:', err)})
		}
	}//anytime state change, send request to update in the server
	handleLike(){
		if (!this.state.liked){
			this.setState(preState=>{
				return {ImageDetail:{...preState.ImageDetail,
									like:preState.ImageDetail.like+1},
						liked:!preState.liked}
			})
		}
		//force update Like to update view, fetch post at the same time to the server
		else{
			this.setState(preState=>{
				let like = preState.ImageDetail.like-1;
				return {ImageDetail:{...preState.ImageDetail,like}, liked:!preState.liked}
			})
		}
	}

	handleCommentSubmit(e){
		e.preventDefault();
		let text =document.getElementById('postComment').value
		if(text==="") {return}
		if (text.length>90)
			{	
				alert('your comment should less than 90 charaters'); 
				return
			}
		let comment={comment:text,
					name:'spiderman',
					avatar:'http://localhost:3001/upload/1517224582889&untitled.png',
					date:0
					};
		this.setState(preState=>{
				return {ImageDetail:{...preState.ImageDetail,
									comment:[comment].concat(preState.ImageDetail.comment)
									}
						}
			})
		document.getElementById('postComment').value=""
	}

	render(){
	return (
	<div>	
		<Panel bsStyle="primary">
			<Panel.Heading >
				<b>{this.state.ImageDetail.title}</b>
			</Panel.Heading>
			<Panel.Body>
				<Image responsive thumbnail 
				src={this.state.ImageDetail.url}  
				style={{}}
				/>
			</Panel.Body>
			<Panel.Footer>
				<Button bsStyle="success" onClick={this.handleLike}  >
					<Glyphicon glyph="heart"/>
					<span> Like</span>
				</Button>{' '}
				<span style={{verticalAlign:'middle', marginRight:'20px'}}>{this.state.ImageDetail.like}</span>
				<span style={{marginRight:'20px'}}>-</span>
				<Glyphicon style={{verticalAlign:'middle'}} glyph="eye-open"/> {' '}
				<span style={{verticalAlign:'middle',marginRight:'20px'}}>{this.state.ImageDetail.view}</span>{''} 
				<span>Posted on: <i>{this.state.ImageDetail.date}</i></span>
			</Panel.Footer>

		</Panel>
		<Comment CommentData={this.state.ImageDetail.comment} 
			 	handleCommentSubmit={this.handleCommentSubmit}
			 	/>
		
	</div>	
	)
	}
}
export default ImageDetail