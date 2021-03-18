import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
import { startReadMovies } from '../actions/moviesList';
import LoadingPage from './LoadingPage';
import Swipe from "./Swipe";

export class SeenPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			initialization: false,
			insufficientMovies: false
		};
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

	findNewMovie = (oldMovie) => {
		let movieId = null;
		let i;
		for (i = 0; i < Object.keys(this.props.moviesList).length; i++)
		{
			movieId = Object.keys(this.props.moviesList)[i]
			if(!this.props.user.seenList || !this.props.user.seenList[movieId])
			{
				if(!oldMovie || oldMovie.id[0] !== [movieId][0])
				{
					this.setState(() => ({
						initialization: true,
						insufficientMovies: false
					})); 
					return {
							title: this.props.moviesList[movieId].title,
							id: [movieId],
							genre: this.props.moviesList[movieId].genre,
							poster: this.props.moviesList[movieId].poster,
							rated: this.props.moviesList[movieId].rated,
							released: this.props.moviesList[movieId].released,
							rating: this.props.moviesList[movieId].rating
					};
				}
			}
		} 
		this.setState(() => ({
			initialization: true,
			insufficientMovies: true
		})); 
		// TODO include condition when movie list is finished
	}

	render() {
		return (
			<div>
			    {
			    	this.state.initialization ? 
			    	<div>
				    	{
				    		this.state.insufficientMovies ? 
				    		<p>Need more movies</p> :
				    		<Swipe 
				    			pageType={"SEEN"}
				    			findNewMovie={this.findNewMovie}
				    			positiveClicked={this.seenClicked}
				    			negativeClicked={this.notSeenClicked}
				    		/>
						}
			    	</div>
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
