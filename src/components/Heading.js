import React from 'react';

const Heading = (props) => {
	return (
		<div className="text-center mt-5 mb-4">
			<h2>{props.text}</h2>
		</div>
	);
};

export default Heading;