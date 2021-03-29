import React from 'react';
import Heading from './Heading'
import Movies from './Movies'

const Favourites = (props) => {
    return (
        <div className="container movies mt-5">
            <Heading text="Your Favourites" />
            <Movies 
                loading={props.loading} 
                movies={props.favourites} 
                buttonValue="Remove Favorite" 
                handleFavourite={props.handleFavourite}
                errMsg="You have no favourites" />
        </div>
    );
};

export default Favourites;