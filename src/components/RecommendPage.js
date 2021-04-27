import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
import { startEditTempUser } from '../actions/tempUser';
import { startReadMovies } from '../actions/moviesList';
import LoadingPage from './LoadingPage';
import Swipe from "./Swipe";
import Options from './Options';

export class RecommendPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			initialization: false,
			errorMessage: 'You have no more movies to recommend! If you would like to find more, click the button below.'
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

	recommendClicked = (movieInfo) => {
		if(this.props.auth.uid)
		{
			let recommendedList = this.props.user.recommendedList;
			recommendedList[movieInfo.id] = {movie: movieInfo.title, recommended: true};
			this.props.startEditUser(this.props.auth.uid, {recommendedList: recommendedList});
		} else {
			let recommendedList = this.props.tempUser.recommendedList;
			recommendedList[movieInfo.id] = {movie: movieInfo.title, recommended: true};
			this.props.startEditTempUser(this.props.tempUser.uid, {recommendedList: recommendedList});
		}
	}

	notRecommendClicked = (movieInfo) => {
		if(this.props.auth.uid)
		{
			let recommendedList = this.props.user.recommendedList;
			recommendedList[movieInfo.id] = {movie: movieInfo.title, recommended: false};
			this.props.startEditUser(this.props.auth.uid, {recommendedList: recommendedList});
		} else {
			let recommendedList = this.props.tempUser.recommendedList;
			recommendedList[movieInfo.id] = {movie: movieInfo.title, recommended: false};
			this.props.startEditTempUser(this.props.tempUser.uid, {recommendedList: recommendedList});
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

		const shuffledMovies = this.props.moviesList.randomList;;

		if(this.props.auth.uid)
		{
			for (i = 0; i < shuffledMovies.length; i++)
			{
				movieId = shuffledMovies[i]
				
				if(!!this.props.user.seenList[movieId] && this.props.user.seenList[movieId].seen)
				{
					if(!this.props.user.recommendedList || !this.props.user.recommendedList[movieId])
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
		} else if(!!this.props.tempUser.seenList)
		{
			for (i = 0; i < shuffledMovies.length; i++)
			{
				movieId = shuffledMovies[i]
				
				if(!!this.props.tempUser.seenList[movieId] && this.props.tempUser.seenList[movieId].seen)
				{
					if(!this.props.tempUser.recommendedList || !this.props.tempUser.recommendedList[movieId])
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
		}
		return newMovieObject;
	}

	render() {
		return (
			<div className="page-background">
				<div className="header-row">
					<div className="page-title">
						<h1>Like it?</h1>
					</div>
					<Options className="options-tab" />
				</div>
				{
			    	this.state.initialization ? 
			    	<Swipe 
		    			findNewMovie={this.findNewMovie}
		    			positiveClicked={this.recommendClicked}
		    			negativeClicked={this.notRecommendClicked}
		    			noMoviesError={this.state.errorMessage}
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
	tempUser: state.tempUser,
	auth: state.auth,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendPage)
