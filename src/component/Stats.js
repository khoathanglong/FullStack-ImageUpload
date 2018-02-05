import React from 'react'
import {Panel, Row, Col} from 'react-bootstrap'


const Stats = ({visits,otherStats})=>{
	return (
			<Panel>
				<Panel.Heading>
					Stats
				</Panel.Heading>
				<Panel.Body>
					<ul style={{listStyleType: "none"}}>
						<li >
							<Row>
								<Col md={2} xs={2}>Image:</Col>
								<Col mdOffset={6} md={2} xs={2} xsOffset={4}>{otherStats.totalImage}</Col>
							</Row>
						</li>
						<li >
							<Row>
								<Col md={2} xs={2}>Comments:</Col>
								<Col mdOffset={6} md={2} xs={2} xsOffset={4}>{otherStats.totalComment}</Col>
							</Row>
						</li>
						<li >
							<Row>
								<Col md={2} xs={2}>Visits:</Col>
								<Col mdOffset={6} md={2} xs={2} xsOffset={4}>{visits}</Col>
							</Row>
						</li>
						<li >
							<Row>
								<Col md={2} xs={2}>Likes:</Col>
								<Col mdOffset={6} md={2} xs={2} xsOffset={4}>{otherStats.totalLike}</Col>
							</Row>
						</li>
					</ul>
				</Panel.Body>
			</Panel>
		)
}
export default Stats