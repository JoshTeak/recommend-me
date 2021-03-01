import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
import { startReadMovies } from '../actions/moviesList';
import LoadingPage from './LoadingPage';

export class RecommendPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			movie: {
				title: null,
				id: null, 
				genre: null,
				poster: null,
				rated: null,
				released: null,
				rating: null
			},
			initialization: false,
			insufficientMovies: true
		};
	};

	componentDidMount() {
		this.initializePage();
	}

	initializePage = () => {
		if(this.props.user.length === 0 || this.props.moviesList.length === 0)				// only gets the moviesList and user if they dont already exist
		{
			this.props.startReadMovies().then(() => {
		      	this.props.startSetUser(this.props.auth.uid).then(() => {
					this.findNewMovie();
		        });
		    });
		} else {
			this.findNewMovie();
		}
	}

	recommendClicked = () => {
		let recommendedList = this.props.user.recommendedList;
		recommendedList[this.state.movie.id] = {movie: this.state.movie.title, recommended: true};

		this.props.startEditUser(this.props.auth.uid, {recommendedList: recommendedList});

		this.findNewMovie();
	}

	notRecommendClicked = () => {
		let recommendedList = this.props.user.recommendedList;
		recommendedList[this.state.movie.id] = {movie: this.state.movie.title, recommended: false};

		this.props.startEditUser(this.props.auth.uid, {recommendedList: recommendedList});

		this.findNewMovie();
	}

	findNewMovie = () => {
		let movieId = null;
		let i = 0;
		for (i = 0; i < Object.keys(this.props.user.seenList).length; i++)
		{
			movieId = Object.keys(this.props.user.seenList)[i]
			if(this.props.user.seenList[movieId].seen)
			{
				if(!this.props.user.recommendedList || !this.props.user.recommendedList[movieId])
				{
					this.setState(() => ({
						movie: {
							title: this.props.moviesList[movieId].title,
							id: [movieId],
							genre: this.props.moviesList[movieId].genre,
							poster: this.props.moviesList[movieId].poster,
							rated: this.props.moviesList[movieId].rated,
							released: this.props.moviesList[movieId].released,
							rating: this.props.moviesList[movieId].rating
						},
						initialization: true,
						insufficientMovies: false
					})); 
					return null;
				} 
			}
		} 

		// this setState allows the page to render even if there are no movies available from seen
		this.setState(() => ({
			initialization: true,
			insufficientMovies: true
		})); 
		// TODO include condition when no movies have been seen
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
			    			<div className="box-layout">
					    		<p className="box-layout__title">{this.state.movie.title}</p>
					    		<img 
							      src={this.state.movie.poster}
							      alt="new"
							    />
							    <div className="button--pair">
								    <button className="button--yes" onClick={this.recommendClicked}>Recommend</button>
								    <button className="button--no" onClick={this.notRecommendClicked}>Do Not Recommend</button>
								</div>
						    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendPage)
