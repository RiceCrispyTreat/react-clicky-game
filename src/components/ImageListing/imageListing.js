import React from "react";
import "./imageListing.css";
import imageBlock from "../imageBlock";

const imageListing = (props) => (
	<div className="container">
		<div className="row">
	    {props.imageFileNames.map((imageFileName, index) => {
	      return <imageBlock key={index} imageFileName={imageFileName} alt={imageFileName} clickHandler={props.clickHandler} gameStatus={props.gameStatus} />
	    })}
	  </div>
  </div>
);

export default imageListing;