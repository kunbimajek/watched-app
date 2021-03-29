import React from 'react';
import Loader from './Loader'

const Movies = (props) => {
	return (
		<div>
			{ props.searchResult
				? <h4 className="mb-3">Showing results for '{props.searchResult.trim()}'</h4> 
				: <h4 className="mb-3"> </h4> }

			{ props.loading ? <Loader/> : props.movies
				? ( <div className="row">
					<>	
						{ props.movies
							.filter(movie => movie.Poster !== 'N/A')
							.map((movie, index) => (
							<div className="box" key={movie.imdbID}>
								<div className="image-container">
									<img src={movie.Poster} alt="movie"></img>
								</div>
								<div className="text">
									<h6>{movie.Title}</h6>
									<p>{movie.Year}</p>
									<p className="fav" 
										onClick={() => props.handleFavourite(movie)}>
										{props.buttonValue}
									</p>
								</div>
							</div>
						))}
					</>
				</div>) 
				: <p className="pt-5 text-center">{props.errMsg}</p> } 
		</div>
	);
};

export default Movies;

