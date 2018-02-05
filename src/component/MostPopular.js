import React from 'react'
import {Panel, Thumbnail, Row, Col,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default ({mostpopular})=>{
	return (
		<Panel>
			<Panel.Heading>
				Most Popular
			</Panel.Heading>
			<Panel.Body>
				<Row>
					{mostpopular.sort((a,b)=>(b.views-a.views))
						.slice(0,3)
						.map(each=>(
							<Col xs={6} sm={4} md={4} key={`${each._id}`}>
								<Link to={`/image/${each._id}`}>
									<Image style={{height:'75px', width:'100%'}}
									 src={each.url}
									 thumbnail />
								</Link> 
								 <hr/>
							</Col>
						))
					}		
				</Row>
			</Panel.Body>
		</Panel>
		)

}