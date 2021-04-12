import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
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
		this.moviesAvailable = false;
	};

	componentDidMount() {
		this.initializePage();
	}

	initializePage = () => {
		if(!this.props.auth.uid || this.props.moviesList.length === 0)				// only gets the moviesList and user if they dont already exist
		{
			this.props.startReadMovies().then(() => {
		      	this.props.startSetUser(this.props.auth.uid).then(() => {
					this.setState(() => ({
						initialization: true
					})); 
		        });
		    });
		} else {
			this.setState(() => ({
				initialization: true
			})); 
		}
	}

	seenClicked = (movieInfo) => {
		let seenList = this.props.user.seenList;
		seenList[movieInfo.id] = {movie: movieInfo.title, seen: true};
		this.props.startEditUser(this.props.auth.uid, {seenList: seenList});
	}

	notSeenClicked = (movieInfo) => {
		let seenList = this.props.user.seenList;
		seenList[movieInfo.id] = {movie: movieInfo.title, seen: false};
		this.props.startEditUser(this.props.auth.uid, {seenList: seenList});
	}

	findNewMovie = (oldMovieObject) => {
		let movieId = null;
		let potentialMovie = null;
		let newMovieObject = {};
		let i;

		for (i = 0; i < Object.keys(this.props.moviesList).length; i++)
		{
			movieId = Object.keys(this.props.moviesList)[i]
			
			if(!this.props.user.seenList || !this.props.user.seenList[movieId])
			{
				if(Object.keys(newMovieObject).length > 2)
				{	
					return newMovieObject;
				} else if(!Object.keys(oldMovieObject)[movieId]) {

					newMovieObject[movieId] = this.props.moviesList[movieId]
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
						<h1>Seen</h1>
					</div>
					<Options className="options-tab" />
				</div>
			    {
			    	this.state.initialization ? 
			    	<Swipe 
		    			findNewMovie={this.findNewMovie}
		    			positiveClicked={this.seenClicked}
		    			negativeClicked={this.notSeenClicked}
		    			determineIfEmpty={this.determineIfEmpty}
		    		/>
			    	: <LoadingPage />
			    }
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
	startEditUser: (id, user) => dispatch(startEditUser(id, user)),
	startSetUser: (id) => dispatch(startSetUser(id)),
	startReadMovies: () => dispatch(startReadMovies())
});

const mapStateToProps = (state) => ({
	user: state.user,
	auth: state.auth,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(SeenPage)
