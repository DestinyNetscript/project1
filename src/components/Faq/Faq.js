import React, { Component, useState } from "react";
import image from '../../images/banner1.jpg';  

function Faq({data}) { 

	const [pdata, setData] = useState(data);

	const [openIndex, setOpenIndex] = useState(null);

	  const toggleAccordion = (index) => {
	    setOpenIndex(openIndex === index ? null : index);
	  };

	return (
		<>
		<section className="faq">
			<div className="container-mini"> 
		    	<div>
					<div className="faqContent">
						<div className="faqTitle">
							<h2>Frequently Asked Questions</h2>
						</div>
					  	<div className="faqMain">  
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
export default Faq; 