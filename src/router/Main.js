import {Switch, Route} from 'react-router-dom'
import HomePage from '../component/HomePage.js'
import ImageDetail from '../component/ImageDetail.js'
import UploadForm from '../component/UploadForm.js'
import ImageTable from '../component/ImageTable.js'

import React from 'react'

export default ({post,handleUpload})=>(
	<Switch>
		<Route exact path='/' render={(props)=>(<HomePage {...props} 
												post={post} 
												handleUpload={handleUpload}	 />)}  />
		<Route path='/image/:id' render={(props)=>{
			let index=post.findIndex( each=> each._id==props.match.params.id);
			//find index of chosen image
			return <ImageDetail {...props} 
				ImageDetail={post[index]}
				/>
			}} 
		/>
	</Switch>
)	