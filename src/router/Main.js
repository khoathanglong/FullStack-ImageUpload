import {Switch, Route} from 'react-router-dom'
import HomePage from '../component/HomePage.js'
import ImageDetail from '../component/ImageDetail.js'
import UploadForm from '../component/UploadForm.js'
import ImageTable from '../component/ImageTable.js'

import React from 'react'

export default ({post,handleUpload,handleLike,handleCommentSubmit})=>(
	<Switch>
		<Route exact path='/' render={(props)=>(<HomePage {...props} 
												post={post} //for ImageTable
												handleUpload={handleUpload}	//for UploadForm
												 />)}  />
		
		<Route path='/image/:id' render={(props)=>{
			let index=post.findIndex( each=> each._id==props.match.params.id);
			console.log(post[index].like)
			//find index of chosen image
			return <ImageDetail {...props} 
				ImageDetail={post[index]}
				handleLike={()=>handleLike(props.match.params.id)}
				handleCommentSubmit={(e)=>handleCommentSubmit(e,props.match.params.id)}
				/>
			}} 
		/>
	</Switch>
)	