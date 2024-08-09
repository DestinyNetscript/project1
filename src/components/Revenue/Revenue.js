import React, { Component, useState } from "react"; 
import { NavLink } from 'react-router-dom'; 

function Revenue({data}) { 

	const [pdata, setData] = useState(data);

	return (
		<>
		<section className="revenue">
			<div className="container-mini">  
				{pdata.map((curElem) => { 
				    return(
				    	<div className="revenue_content" key={curElem.id}> 
						  <div className="revenue_sec">
						  	<div className="revenueleft">
						  		<h2>{curElem.title}</h2>
						  		<p>{curElem.desc1}</p>
						  		<NavLink to="/form" className="demo_grey">Schedule A Demo Call.</NavLink>
						  	</div>
						  	<div className="revenueright">
						  		<div> 
						  			<ul>
						  				<li><h2>{curElem.li1}</h2><p>{curElem.li1p}</p></li>
						  				<li><h2>{curElem.li2}</h2><p>{curElem.li2p}</p></li>
						  				<li><h2>{curElem.li3}</h2><p>{curElem.li3p}</p></li>
						  				<li><h2>{curElem.li4}</h2><p>{curElem.li4p}</p></li> 
						  			</ul>
						  		</div>
						  	</div>
						  </div>
					  </div>
				    )
				})} 
			</div>
		</section>
		</>
	);

}
export default Revenue; 