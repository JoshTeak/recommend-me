import React from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/user';
import { startReadMovies } from '../actions/moviesList';
import { startReadUsers } from '../actions/users';
import LoadingPage from './LoadingPage';

export class FindPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {};
	};

	componentDidMount() {
		this.initializePage();
	}

	initializePage = () => {
		if(!this.props.auth.uid || this.props.moviesList.length === 0 || Object.keys(this.props.users).length === 0)
		{
			this.props.startReadMovies().then(() => {
				this.props.startReadUsers().then(() => {
			      	this.props.startSetUser(this.props.auth.uid).then(() => {
						this.findNewMovie();
			        });
		        });
		    });
		} else {
			this.findNewMovie();
		}
	}

	findNewMovie = () => {
		let i = 0;
		let mainSampleObject = this.props.users;

		// delete self from the list
		delete mainSampleObject[this.props.auth.uid]

		let storedSample = Object.keys(mainSampleObject);
		let currentSample = new Array();

		// scans through my movie recommendations, if another user has the same recommendations they are adding to an array of like users
		do {
			let movieId = Object.keys(this.props.user.recommendedList)[i]
			let currentSample = new Array();

			storedSample.forEach((sampleUser) => {
				if(!!this.props.users[sampleUser].recommendedList && this.props.users[sampleUser].recommendedList[movieId])
				{
					if(this.props.users[sampleUser].recommendedList[movieId].recommended === this.props.user.recommendedList[movieId].recommended)
					{
						currentSample.push(sampleUser);
					}
				} else {
					currentSample.push(sampleUser);
				}
			})

			if(currentSample.length > 6 && currentSample.length < 30)
			{
				storedSample = currentSample;
			}
			i = i + 1
		} while (i < Object.keys(this.props.user.recommendedList).length || currentSample.length > 6)

		let mainSample;
		let randomNumber
		// select one random like user
		for (i = 0; i < storedSample.length; i++)
		{
			randomNumber = Math.floor(Math.random() * Math.floor(storedSample.length));
			mainSample = storedSample[randomNumber];
			if(!!this.props.users[mainSample].recommendedList) {break; }
		}
		// compares sample user's recommendations to all other users 
		let recommendListSamples = new Array();
		i = 0;
		do {
			let movieId = Object.keys(this.props.users[mainSample].recommendedList)[i];
			let movieRecommendRating = 0;
			let numberOfRecommendations = 0;
			let recommendationScore = 0;

			if(!this.props.user.recommendedList[movieId])
			{
				if(!this.props.user.seenList[movieId] || (this.props.user.seenList[movieId] && !this.props.user.seenList[movieId].seen))
				{
					storedSample.forEach((sampleUser) => {
						if(!!this.props.users[sampleUser].recommendedList && !!this.props.users[sampleUser].recommendedList[movieId])
						{
							if(this.props.users[sampleUser].recommendedList[movieId].recommended)
							{
								movieRecommendRating++;
							} else {
								movieRecommendRating--;
							}
						}
						numberOfRecommendations++;
					})

					recommendationScore = movieRecommendRating*100/numberOfRecommendations;
					recommendListSamples.push({score: recommendationScore, movie: movieId});
				}
			}

			i = i + 1
		} while (i < Object.keys(this.props.users[mainSample].recommendedList).length)

		let recommendedMovieList = new Object();
		this.filter(recommendListSamples).forEach((movieItem) => {
			const id = movieItem.movie;
			recommendedMovieList[id] = {
				title: this.props.moviesList[id].title,
				genre: this.props.moviesList[id].genre,
				poster: this.props.moviesList[id].poster,
				rated: this.props.moviesList[id].rated,
				released: this.props.moviesList[id].released,
				rating: this.props.moviesList[id].rating,
				score: movieItem.score
			}
		})
		this.setState(() => ({
			recommendedMovieList,
			initialization: true
		})); 
	}

	filter = (movies) => {
		return movies.filter((movie) => {
			return true;
		}).sort((a, b) => {
			return a.score < b.score ? 1 : -1;				// sort function needs to return -1 if a is selected and 1 if b is selected
		});
	};

	render() {
		return (
			<div>
			    {
			    	this.state.initialization ? 
			    	<div className="box-layout-list">
			    	{
			    		Object.keys(this.state.recommendedMovieList).map((movie) => (
				    			<div className="box-layout-separators">
								    <div className="box-movie-card-layout">
							    		<div className="box-layout__poster find-page">
								    		<img 
										      src={this.state.recommendedMovieList[movie].poster}
										      alt="new"
										    />
									    </div>
									    <div className="box-loyout__bottom-info">
							    			<p className="box-layout__subtitle">{this.state.recommendedMovieList[movie].title}</p>
							    			<p className="box-layout__subtitle">Recommendation score: {this.state.recommendedMovieList[movie].score}</p>
							    			<p className="box-layout__subtitle">IMDb rating: {this.state.recommendedMovieList[movie].rating}</p>
										    <p className="box-layout__subtitle">Released: {this.state.recommendedMovieList[movie].released}</p>
										    <p className="box-layout__subtitle">Genre: {this.state.recommendedMovieList[movie].genre}</p>
										</div>
								    </div>
							    </div>
							)
			    		)
					}
			    	</div>
			    	: <LoadingPage />
			    }
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
	startSetUser: (id) => dispatch(startSetUser(id)),
	startReadMovies: () => dispatch(startReadMovies()),
	startReadUsers: () => dispatch(startReadUsers())
});

const mapStateToProps = (state) => ({
	user: state.user,
	users: state.users,
	auth: state.auth,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPage)