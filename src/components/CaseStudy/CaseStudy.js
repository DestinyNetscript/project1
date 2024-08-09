import React, { Component, useState } from "react";  

function CaseStudy({data}) { 

	const [pdata, setData] = useState(data);

	return (
		<>
		<section className="case_study">
			<div className="container-mini"> 
				<div className="case_title"> 
		            <span>{pdata[0].titlespan}</span>
		            <h2>{pdata[0].title}</h2>
		            <p>{pdata[0].desc1}</p>
		            <p>{pdata[0].desc2}</p>
	          	</div>
				{pdata.map((curElem) => { 
				    return(
				    	<div className="case_study_content" key={curElem.id}> 
						  <div className="case_sec">
						  	<div className="caseleft">
						  		<h2>{curElem.videoTitle}</h2>
						  		<div>{curElem.video}</div>
						  	</div>
						  	<div className="caseright">
						  		<div>
						  			<h3>{curElem.h3}</h3>
						  			<p>{curElem.p}</p>
						  		</div>
						  		<div>
						  			<h3>{curElem.h31}</h3>
						  			<p>{curElem.p1}</p>
						  		</div>
						  		<div>
						  			<h4>{curElem.ultitle}</h4>
						  			<ul>
						  				<li>{curElem.li1}</li>
						  				<li>{curElem.li2}</li>
						  				<li>{curElem.li3}</li>
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
export default CaseStudy; 