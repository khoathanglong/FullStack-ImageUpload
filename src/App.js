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
    super()
    this.state={post:sampleData.post, visits:55, isLoading:false, isUploaded:false}
    this.handleUpload=this.handleUpload.bind(this)
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
  console.log('updated')
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
    })
    return {
      totalLike:totalLike,
      totalComment:totalComment,
      totalImage:totalImage
    }
  }

  render() {
    
    if(!this.state.isLoading) {return (<div>Loading...</div>) }
    return (
      <div className="container">
          <Header/>
     	 	  <Col md={8} sm={12} >
     	 		   <Main post={this.state.post} handleUpload={this.handleUpload} /> 
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