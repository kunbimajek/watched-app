import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, withRouter } from "react-router-dom";
import axios from 'axios';

import PublicRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import { getUser, getToken, removeUserSession, setUserSession } from './Utils/Common';

import Topbar from './components/Topbar'
import Header from './components/Header'
import Movies from './components/Movies'
import Favourites from './components/Favourites'
import Login from './components/Login'

import logo from './logo.svg';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = (props) => {
	const user = getUser()

	const [loading, setLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [searchedMovie, setSearchedMovie] = useState('');
	const [result, setResult] = useState('');
	const [favourites, setFavourites] = useState([]);
	const [notification, setNotification] = useState('');

	const getMovies = async (e) => {
		e.preventDefault();

		setLoading(true)

		const url = `https://www.omdbapi.com/?s=${searchedMovie}&apikey=263d22d8`;
		const response = await fetch(url);
		const data = await response.json();

		if(!data.Search) {
			setMovies([]);
			setResult('')
		}

		setMovies(data.Search);
		setResult(searchedMovie)
		setLoading(false)
	};

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('watched-favourites')
		);
		movieFavourites && setFavourites(movieFavourites);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('watched-favourites', JSON.stringify(items));
	};
	
	const addFavourite = (movie) => {
		const found = favourites.some(fav => fav.imdbID === movie.imdbID);

		const newFavouriteList = [...favourites, movie];

		if(!found) {	
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
			setNotification(
				<Alert variant="success" onClose={() => setNotification(false)} dismissible>Movie added to favourite</Alert>
			) 
			setTimeout(() => { setNotification('') }, 1000);
		} else { alert('Movie is already in favourites') }
	};

	const removeFavourite = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
		setNotification(
			<Alert variant="danger" onClose={() => setNotification(false)} dismissible>Movie removed to favourite</Alert>
		) 
		setTimeout(() => { setNotification('') }, 1000);
	};

	const handleLogout = () => {
		removeUserSession();
		props.history.push('/');
	}

	useEffect(() => {
		const token = getToken();
		if (!token) {
		  	return;
		}

		setLoading(true);
		axios.get(`https://polar-bastion-36432.herokuapp.com/verifyToken?token=${token}`).then(response => {
			setUserSession(response.data.token, response.data.user);
			setLoading(false);
		}).catch(error => {
		  	removeUserSession();
		  	setLoading(false);
		});
	  }, []);
	
	return (
		<div className="app">
			<Router>
				<nav className="">
					<div className="container-fluid d-md-flex justify-content-between">
						<NavLink to="/home"><img src={logo} alt="logo" /></NavLink>
						<div className="float-right">
							<NavLink to="/" activeClassName='is-active' exact>Log in</NavLink>
							<NavLink to="/home" activeClassName="is-active">Home</NavLink>
							<NavLink to="/favourites" activeClassName='is-active'>Your Favourites</NavLink>
						</div>
					</div>
				</nav>

				{ props.location.pathname !== '/' ? <Topbar notification={notification} logout={handleLogout}/> : null }

				<Switch>
					<PublicRoute path="/" exact component={Login} /> 
					
					<PrivateRoute path="/home" >
						<div className="container movies mt-3">
							{/* <h2>Welcome {user.name}!</h2> */}
							<Header searchValue={searchedMovie} setSearchValue={setSearchedMovie} getMovies={getMovies}/>
							<Movies loading={loading} movies={movies} searchResult={result} buttonValue="Favorite" handleFavourite={addFavourite} errMsg="Movie not found. Try again" />	
						</div>
					</PrivateRoute>

					<PrivateRoute path="/favourites">
						<Favourites loading={loading} favourites={favourites} handleFavourite={removeFavourite} />
					</PrivateRoute>

					<Route render={() => <h1 className="mt-5 text-center">404: page not found</h1>} />
				</Switch>

			</Router>
		</div>
	);
};

export default withRouter(App)
