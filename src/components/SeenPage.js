import React from 'react';
import { connect } from 'react-redux';
import { startEditUser, startSetUser } from '../actions/user';
import { startReadMovies } from '../actions/moviesList';
import LoadingPage from './LoadingPage';

export class SeenPage extends React.Component {
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
		if(!this.props.auth.uid || this.props.moviesList.length === 0)				// only gets the moviesList and user if they dont already exist
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

	seenClicked = () => {
		let seenList = this.props.user.seenList;
		seenList[this.state.movie.id] = {movie: this.state.movie.title, seen: true};

		this.props.startEditUser(this.props.auth.uid, {seenList: seenList});

		this.findNewMovie();
	}

	notSeenClicked = () => {
		let seenList = this.props.user.seenList;
		seenList[this.state.movie.id] = {movie: this.state.movie.title, seen: false};
		this.props.startEditUser(this.props.auth.uid, {seenList: seenList});

		this.findNewMovie();
	}

	findNewMovie = () => {
		let movieId = null;
		let i;
		for (i = 0; i < Object.keys(this.props.moviesList).length; i++)
		{
			movieId = Object.keys(this.props.moviesList)[i]
			if(!this.props.user.seenList || !this.props.user.seenList[movieId])
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
			    			<div className="box-layout">
					    		<div className="box-layout__poster seen-page">
						    		<img 
								      src={this.state.movie.poster}
								      alt="new"
								    />
							    </div>
							    <div className="box-loyout__bottom-info">
					    			<p className="box-layout__title">{this.state.movie.title}</p>
								    <div className="button--pair">
									    <button className="button--yes" onClick={this.seenClicked}>Seen</button>
									    <button className="button--no" onClick={this.notSeenClicked}>Haven't seen</button>
								    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeenPage)
