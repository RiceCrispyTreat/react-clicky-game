import React from "react";
import "./imageListing.css";
import ImageBlock from "../imageBlock";

const ImageListing = (props) => (
	<div className="container">
		<div className="row">
	    {props.ImageNames.map((ImageName, index) => {
	      return <ImageBlock key={index} imageFileName={ImageName} alt={ImageName} clickHandler={props.clickHandler} gameStatus={props.gameStatus} />
	    })}
	  </div>
  </div>
);

export default ImageListing;
