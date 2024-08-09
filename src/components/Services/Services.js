import React, { Component, useState } from "react";

function Services({data}) {

	const[Ndata, setData] = useState(data);

	return (
	<>
		<div className="services">
			<div className="container-mini">
				<div className="serviceTitle">
					<h2>In Summary, here's what you achieve with Accelerated:</h2>
				</div>
			  	<div className="servicesMain">
			  		{Ndata.map((curElem) => { 
					    return(
					      <div className="service" key={curElem.id}> 
					        <h1>{curElem.title}</h1>
					        <div>{curElem.svg}</div> 
					        <p>{curElem.desc}</p> 
					      </div>
					    )
					})}
				</div>
			</div>
		</div>
	</>
	);

}
export default Services; 