import React from 'react';

const Search = (props) => {
	return (
		<div className="col col-sm-4 mt-3">
			<form onSubmit={props.change}>
				<input
					className="form-control"
					value={props.value}
					onChange={(event) => props.setValue(event.target.value.toLowerCase())}
					placeholder="Type to search..."
				></input>
			</form>
		</div>
	);
};

export default Search;