import React, { Component, useState } from "react";
import image from '../../images/banner2.jpg';  

function Founder2({data}) { 

	const [pdata, setData] = useState(data);

	const [openIndex, setOpenIndex] = useState(null);

	  const toggleAccordion = (index) => {
	    setOpenIndex(openIndex === index ? null : index);
	  };

	return (
		<>
		<section className="founder">
			<div className="container-mini"> 
		    	<div>
					<div className="founderContent align-items-center">
					  	<div className="founderContentLeft"> 
					  		<h2>Worlds Best CRO Experts</h2>
					  		<p>With 50 of the brightest data analysts, growth marketers, and conversion specialists in our ranks, we're the secret weapon behind the meteoric rise of the fastest-growing 8-figure DTC brands.</p>
					  		<div className="accordion">
								{data.map((item, index) => (
									<div className="accordion-item" key={index}>
									  <div
									    className={`accordion-title ${openIndex === index ? 'active' : ''}`}
									    onClick={() => toggleAccordion(index)}
									  >
									    {item.title}
									  </div>
									  {openIndex === index && (
									    <div className="accordion-content">{item.content}</div>
									  )}
									</div>
								))}
							</div>
					  	</div>
					  	<div className="founderContentRight">
					  		<img src={image} alt=""/>
					  	</div>
				  	</div>
			  	</div> 
			</div>
		</section>
		</>
	);

}
export default Founder2; 