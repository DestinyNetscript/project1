import React, { Component, useState } from "react";  

function PowerfullData({data}) { 

	const [pdata, setData] = useState(data);

	return (
	<>
		<section className="Powerfull">
			<div className="container">

				{pdata.map((curElem) => { 
				    return(
				    	<div key={curElem.id}>
					      <div className="power_main_title">
						  	<span>{curElem.titlespan}</span>
						  	<h2>{curElem.title}</h2>
						  </div>
						  <div className="powerContent">
						  	<div className="powerContentLeft">
						  		<ul>
						  			<li>{curElem.desc1}</li>
						  			<li>{curElem.desc2}</li> 
						  			{curElem.desc3 && <li><b>{curElem.desc3}</b></li>} 
						  			{curElem.desc33 && <li>{curElem.desc33}</li>}
						  			{curElem.desc4 && <li><b>{curElem.desc4}</b></li>} 
						  		</ul>
						  	</div>
						  	<div className="powerContentRight">
						  		<img src={curElem.image} alt=""/>
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
export default PowerfullData; 