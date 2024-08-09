import React, { Component, useState } from "react";
import { NavLink } from 'react-router-dom';
import image from '../../images/user1.jpg';

function Portfolio({data}) {

	const[Ndata, setData] = useState(data);

	return (
	<>
		<div className="portfolio">
			<div className="container-mini">
				<div className="portfolioTitle">
					<h2>Accelerated has a proven track record of 204+ Brands.</h2>
					<p>The sole reason we exist is to help our clients generate positive free cash flow, which is the source of business value and wealth creation. </p>
					<NavLink to="/form" className="demo">Schedule A Demo Call.</NavLink>
					<ul>
						<li><img src={image} alt=""/></li>
						<li><img src={image} alt=""/></li>
						<li><img src={image} alt=""/></li>
						<li><img src={image} alt=""/></li>
						<li><img src={image} alt=""/></li>
					</ul>
					<h5>204+ Successful Customers</h5>
				</div>
			  	<div className="portfolioMain">
			  		{Ndata.map((curElem) => { 
					    return(
					      <div className="ports" key={curElem.id}>
		 			        <div><img src={curElem.image} alt="Testimonial" /></div> 
					        <div className="portContent">
					        	<h2>{curElem.title}</h2>
					        	<p>{curElem.category}</p> 
					        </div>
					      </div>
					    )
					})}
				</div>
			</div>
		</div>
	</>
	);

}
export default Portfolio; 