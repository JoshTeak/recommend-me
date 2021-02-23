import React from 'react';
import { connect } from 'react-redux';
import {startEditUser} from '../actions/user';
import LoadingPage from './LoadingPage';
import movieList from './MovieList';
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
			}
		};
	};

	componentDidMount() {
		this.findNewMovie();
	}

	recommendClicked = () => {
		let recommendedList = this.props.user.recommendedList;
		recommendedList[this.state.movie.id] = {movie: this.state.movie.title, recommended: true};

		this.props.startEditUser(this.props.user.id, {recommendedList: recommendedList});

		this.findNewMovie();
	}

	notRecommendClicked = () => {
		let recommendedList = this.props.user.recommendedList;
		recommendedList[this.state.movie.id] = {movie: this.state.movie.title, recommended: false};

		this.props.startEditUser(this.props.user.id, {recommendedList: recommendedList});

		this.findNewMovie();
	}

	findNewMovie = () => {
		let movieId = null;
		let i = 0;
		do {
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
						}
					})); 
					return null;
				} 
			}
			i = i + 1
		} while (i < Object.keys(this.props.user.seenList).length)
	}

	render() {
		return (
			<div className="body">
			    {
			    	Object.keys(this.props.user).length !== 0 ? 
			    	<div>
				    	{
				    		this.state.movie.title !== null ? 
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
							: <p>Need more movies</p>
						}
			    	</div>
			    	: <LoadingPage />
			    }
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
	startEditUser: (id, user) => dispatch(startEditUser(id, user))
});

const mapStateToProps = (state) => ({
	user: state.user,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendPage)
