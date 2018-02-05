import React from 'react'
import {Panel, Thumbnail, Col, Row,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ImageTable = ({post})=>{
	return (
			<Panel>
				<Panel.Heading>
					Newest Images
				</Panel.Heading>
				<Panel.Body>
					<Row>
						{post.map(each => (
							<Col lg={3} md={4} sm={6} xs={12} key={each._id}>
							<Link to={`/image/${each._id}`} >
								<Image
								src={each.url}
								style={{height:'150px', width:'100%' }}
								 />
							</Link>	 
							<hr/>
							</Col>	
						))}
					</Row>
				</Panel.Body>
			</Panel>
	)
}
export default ImageTable