import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
import { startEditTempUser } from '../actions/tempUser';
import { startReadMovies } from '../actions/moviesList';
import LoadingPage from './LoadingPage';
import Swipe from "./Swipe";
import Options from './Options';

export class SeenPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			initialization: false,
			errorMessage: 'Oops! We have run out of movies for you to look at. Try again at a later date.'
		};
	};

	componentDidMount() {
		this.initializePage();
	}

	initializePage = () => {
		if(this.props.user.length === 0 && !!this.props.auth.uid)
		{	
			this.props.startSetUser(this.props.auth.uid).then(() => {
				if(this.props.moviesList.length === 0)
				{
					this.props.startReadMovies().then(() => {
						this.setState(() => ({
							initialization: true
						})); 
				    });
				} else {
					this.setState(() => ({
						initialization: true
					})); 
				}
		    });
		} else {
			if(this.props.moviesList.length === 0)
			{
				this.props.startReadMovies().then(() => {
					this.setState(() => ({
						initialization: true
					})); 
		        });
			} else {
				this.setState(() => ({
					initialization: true
				})); 
			}
		}
	}

	seenClicked = (movieInfo) => {
		if(this.props.auth.uid)
		{
			let seenList = this.props.user.seenList;
			seenList[movieInfo.id] = {movie: movieInfo.title, seen: true};
			this.props.startEditUser(this.props.auth.uid, {seenList: seenList});
		} else {
			let seenList = this.props.tempUser.seenList;
			seenList[movieInfo.id] = {movie: movieInfo.title, seen: true};
			this.props.startEditTempUser(this.props.tempUser.uid, {seenList: seenList});
		}
	}

	notSeenClicked = (movieInfo) => {
		if(this.props.auth.uid)
		{
			let seenList = this.props.user.seenList;
			seenList[movieInfo.id] = {movie: movieInfo.title, seen: false};
			this.props.startEditUser(this.props.auth.uid, {seenList: seenList});
		} else {
			let seenList = this.props.tempUser.seenList;
			seenList[movieInfo.id] = {movie: movieInfo.title, seen: false};
			this.props.startEditTempUser(this.props.tempUser.uid, {seenList: seenList});
		}
	}

	shuffle = (array) => {
	  let currentIndex = array.length; 
	  let temporaryValue; 
	  let randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}


	findNewMovie = (oldMovieObject) => {
		let movieId = null;
		let potentialMovie = null;
		let newMovieObject = {};
		let i;
		const shuffledMovies = this.props.moviesList.randomList;

		if(this.props.auth.uid)
		{
			for (i = 0; i < Object.keys(this.props.moviesList.list).length; i++)
			{
				movieId = shuffledMovies[i]
				
				if(!this.props.user.seenList || !this.props.user.seenList[movieId])
				{
					if(Object.keys(newMovieObject).length > 2)
					{	
						return newMovieObject;
					} else if(!Object.keys(oldMovieObject)[movieId]) {

						newMovieObject[movieId] = this.props.moviesList.list[movieId]
					}				
				}
			} 
		} else {
			for (i = 0; i < Object.keys(this.props.moviesList.list).length; i++)
			{
				movieId = shuffledMovies[i]
				
				if(!this.props.tempUser.seenList || !this.props.tempUser.seenList[movieId])
				{
					if(Object.keys(newMovieObject).length > 2)
					{	
						return newMovieObject;
					} else if(!Object.keys(oldMovieObject)[movieId]) {

						newMovieObject[movieId] = this.props.moviesList.list[movieId]
					}				
				}
			} 
		}
		return oldMovieObject;
	}

	render() {
		return (
			<div className="page-background">
				<div className="header-row">
					<div className="page-title">
						<h1>Seen it?</h1>
					</div>
					<Options className="options-tab" />
				</div>
			    {
			    	this.state.initialization ? 
			    	<Swipe 
		    			findNewMovie={this.findNewMovie}
		    			positiveClicked={this.seenClicked}
		    			negativeClicked={this.notSeenClicked}
		    		/>
			    	: <LoadingPage />
			    }
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
	startEditUser: (id, user) => dispatch(startEditUser(id, user)),
	startEditTempUser: (id, user) => dispatch(startEditTempUser(id, user)),
	startSetUser: (id) => dispatch(startSetUser(id)),
	startReadMovies: () => dispatch(startReadMovies())
});

const mapStateToProps = (state) => ({
	user: state.user,
	auth: state.auth,
	tempUser: state.tempUser,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(SeenPage)
