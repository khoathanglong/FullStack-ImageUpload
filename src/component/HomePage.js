import React from 'react'
import UploadForm from './UploadForm.js'
import ImageTable from './ImageTable.js'

export default (props)=>{
	return (
		<div>
			<UploadForm handleUpload={props.handleUpload} />
			<ImageTable post={props.post}/>
		</div>
	)
}

