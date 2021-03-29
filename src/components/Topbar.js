import React from 'react';

const Topbar = (props) => {
	return (
       <div className="container mt-3">
            {props.notification}
            <button onClick={props.logout} className="sign-out-btn">Sign out</button>
	   </div>
	);
}; 

export default Topbar

		   	