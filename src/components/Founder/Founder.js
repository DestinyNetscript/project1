import React, { Component, useState } from "react";
import image from '../../images/banner1.jpg';  

function Founder({data}) { 

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
					  	<div className="founderContentRight">
					  		<img src={image} alt=""/>
					  	</div>
					  	<div className="founderContentLeft"> 
					  		<h2><span>Carl Weische,</span> Founder & CEO</h2>
					  		<p>Mostly known for being the mastermind behind the online stores of industry leading brands like The Oodie, Vessi, and KinoBody. </p>
					  		<p>Over the past 4 years, he has built Accelerated into the thought leader of conversion optimization & landing pages. </p>
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
				  	</div>
			  	</div> 
			</div>
		</section>
		</>
	);

}
export default Founder; 