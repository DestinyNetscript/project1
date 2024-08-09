import React, { Component, useState } from "react";

function Testimonial({data}) {

	const[Ndata, setData] = useState(data);

	return (
	<>
		<div className="testimonialContent">
			<div className="container-mini">
			  <div className="testMain">
			  	{Ndata.map((curElem) => { 
				    return(
				      <div className="testimonials" key={curElem.id}>
				      	<p>{curElem.svg}</p>
				        <h1>{curElem.desc} <span>{curElem.desc1}</span></h1> 
				        <div className="dflex gap15 align-items-center mt-30">
				        	<div className="auther">
				        		<img src={curElem.image} alt="Testimonial" />
				        	</div>
				        	<div>
				        		 <h3><b>{curElem.title}</b></h3>
				        		 <p>{curElem.a2}</p>
				        	</div>
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
export default Testimonial; 