import React from 'react';
import Search from './Search'
import Heading from './Heading'

const Header = (props) => {
	return (
       <div>
			<div className="d-md-flex align-items-center justify-content-between mb-4 search">
				<Heading text="Search for a Movie" />
				<Search value={props.searchValue} setValue={props.setSearchValue} change={props.getMovies}/>
			</div>
	   </div>
	);
}; 

export default Header