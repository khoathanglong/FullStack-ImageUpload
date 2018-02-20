import React, { Component } from 'react'
import UploadForm from './component/UploadForm.js'
import {Col, Row, ClearFix } from 'react-bootstrap'
import ImageTable from './component/ImageTable.js'
import Stats from './component/Stats.js'
import MostPopular from './component/MostPopular.js'

import Header from './component/Header.js'
import Main from './router/Main.js'
import sampleData from './DataSample.js'

class App extends Component {
constructor(){
    super();
    this.state={post:sampleData.post, visits:55, isLoading:false, isUploaded:false};
    this.handleUpload=this.handleUpload.bind(this);
    this.handleLike=this.handleLike.bind(this);
    this.handleCommentSubmit=this.handleCommentSubmit.bind(this)
}
componentDidMount(){
  fetch('/api/visits')
  .then(result=> result.json())
  .then(data=>{
    this.setState({visits:data.visits})
  });
  this.fetchData()
}

fetchData(){
  fetch('/api/images')
  .then(result =>{
    return result.json()})
  .then(data1=>{
    if (sampleData!==[]){
      this.setState(prevState=>({post:data1,
                                isLoading:prevState.isLoading?
                                  prevState.isLoading:
                                  !prevState.isLoading}));
    }
  })
}

componentDidUpdate(){
  console.log('updated');
}

handleUpload(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append('imageFile', document.getElementById('fileUpload').files[0]);
    formData.append('title',document.getElementById('title').value);
    formData.append('description',document.getElementById('description').value);
    //this is adding a name of the input and the file to formData
    //do similarly with text field
    fetch('/upload',{
      method:"POST",
      headers:{Accept:"application/json"},
      body: formData
    })
    .then (response=>response.json())
    .then(response =>{
      this.setState(preState=>({
        post:[response].concat(preState.post)
      }))
    })
    .catch(err=>{console.log(err)})
}

handleStat(){
    let totalImage=this.state.post.length;
    let totalComment=0;
    let totalLike=0;
    this.state.post.forEach(each=> {
      totalComment+=each.comment.length;
      totalLike+=each.like
    });
    return {
      totalLike:totalLike,
      totalComment:totalComment,
      totalImage:totalImage
    }
}

handleLike(id){
  let index=this.state.post.findIndex(each=>each._id==id);
  let updatedLike = this.state.post[index].like+1;
  let newPostState=this.state.post.slice();
  newPostState[index].like=updatedLike;
  this.setState({
    post:newPostState
  });
  fetch('/image/updateLike',{
        method:"POST",
        headers:{'Accept':'application/json','Content-Type': 'application/json'},
        //Content-type needed to get req.body in the server
        body:JSON.stringify(newPostState[index])
        //newPostState[index] has the information of 1 specific image
      }).catch(err=>{console.log('like/comment/view err:', err)});
}

handleCommentSubmit(e,id){
    e.preventDefault()
    let index=this.state.post.findIndex(each=>each._id==id);//find the exact picture
    let text =document.getElementById('postComment').value //get the comment value
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
    let newPostState=this.state.post.slice();//avoid mutating state
    newPostState[index].comment=[comment].concat(this.state.post[index].comment)
    this.setState({post:newPostState})

    fetch('/image/updateComment',{
        method:"POST",
        headers:{'Accept':'application/json','Content-Type': 'application/json'},
        //Content-type needed to get req.body in the server
        body:JSON.stringify({...comment,_id:this.state.post[index]._id})
        //add the id to the POST to find document to update in the mongo server
      })
      .catch(err=>{console.log('like/comment/view err:', err)})
    document.getElementById('postComment').value=""

}

  render() {
    
    if(!this.state.isLoading) {return (<div>Loading...</div>) }
    return (
      <div className="container">
          <Header/>
     	 	  <Col md={8} sm={12} >

     	 		   <Main post={this.state.post}
              handleUpload={this.handleUpload}
              handleLike={this.handleLike}
              handleCommentSubmit={this.handleCommentSubmit} /> 

      		</Col>
          <Col md={4}  sm={6}  xs={12}>
      			<Stats 
            visits={this.state.visits}
            otherStats={this.handleStat()}
            />
      		</Col>
          <Col md={4} sm={6} xs={12} >
      			<MostPopular mostpopular= {this.state.post.slice(0,3)} />
      		</Col>
      	
      </div>
    );
  }
}

export default App;
//handle most popular