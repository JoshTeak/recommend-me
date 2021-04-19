import React from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/user';
import { startReadMovies } from '../actions/moviesList';
import { startReadUsers } from '../actions/users';
import { startReadTempUsers } from '../actions/tempUsers';
import LoadingPage from './LoadingPage';
import Options from './Options';
import { history } from '../routers/AppRouter';

export class FindPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {};
	};

	componentDidMount() {
		this.initializePage();
	}

	initializePage = () => {

		if(this.props.users.length === 0 || this.props.tempUsers.length === 0 || this.props.moviesList.length === 0)
		{
			this.props.startReadMovies().then(() => {
				this.props.startReadUsers().then(() => {
			      	this.props.startReadTempUsers().then(() => {
			      		if(!!this.props.auth.uid)
			      		{
				      		this.props.startSetUser(this.props.auth.uid).then(() => {
				      			if(10 <= Object.keys(this.props.user.recommendedList).length)
				      			{
									this.findNewMovie();
								} else {
									this.setState(() => ({
										initialization: true
									})); 
								}
					        });
			      		} else {
			      			if(10 <= Object.keys(this.props.tempUser.recommendedList).length)
			      			{
								this.findNewMovie();
							} else {
								this.setState(() => ({
									initialization: true
								})); 
							}
			      		}
			        });
		        });
		    });
		} else {
			if(!!this.props.auth.uid)
      		{
      			if(this.props.user.length === 0)
      			{
	      			this.props.startSetUser(this.props.auth.uid).then(() => {
		      			if(10 <= Object.keys(this.props.user.recommendedList).length)
		      			{
							this.findNewMovie();
						} else {
							this.setState(() => ({
								initialization: true
							})); 
						}
			        });
	      		} else {
	      			if(10 <= Object.keys(this.props.user.recommendedList).length)
	      			{
						this.findNewMovie();
					} else {
						this.setState(() => ({
							initialization: true
						})); 
					}
	      		}
      		} else {
      			if(10 <= Object.keys(this.props.tempUser.recommendedList).length)
      			{
					this.findNewMovie();
				} else {
					this.setState(() => ({
						initialization: true
					})); 
				}
      		}
		}
	}

	findNewMovie = () => {
		let i = 0;
		const primarySampleObject = this.props.users;
		const secondarySampleObject = this.props.tempUsers;

		let mainSampleObject = {...primarySampleObject, ...secondarySampleObject};
		let currentUser;
		// delete self from the list
		if(!!this.props.auth.uid)
		{
			delete mainSampleObject[this.props.auth.uid]
			currentUser = this.props.user;

		} else {
			delete mainSampleObject[this.props.tempUser.uid]
			currentUser = this.props.tempUser;
		}

		let storedSample = Object.keys(mainSampleObject);
		let currentSample = new Array();

		// only storing users that have made recommendations
		storedSample.forEach((sampleUser) => {
			if(!!mainSampleObject[sampleUser].recommendedList)
			{
				currentSample.push(sampleUser);
			}
		})
		storedSample = currentSample;

		// scans through my movie recommendations, if another user has the same recommendations they are adding to an array of like users
		do {
			let movieId = Object.keys(currentUser.recommendedList)[i]
			currentSample = new Array();

			storedSample.forEach((sampleUser) => {
				if(!!mainSampleObject[sampleUser].recommendedList && mainSampleObject[sampleUser].recommendedList[movieId])
				{
					if(mainSampleObject[sampleUser].recommendedList[movieId].recommended === currentUser.recommendedList[movieId].recommended)
					{
						currentSample.push(sampleUser);
					}
				}
			})
			
			if(currentSample.length > 5)
			{
				storedSample = currentSample;
			}

			i = i + 1
		} while (i < Object.keys(currentUser.recommendedList).length || currentSample.length > 5)


		// creates a unique list of movies for score evaluation
		let unseenRecommendedMoviesList = new Array();
		storedSample.forEach((sampleUser) => {
			Object.keys(mainSampleObject[sampleUser].recommendedList).forEach((movieId) => {

				if((!currentUser.seenList[movieId] || (currentUser.seenList[movieId] && !currentUser.seenList[movieId].seen)) && unseenRecommendedMoviesList.indexOf(movieId) === -1)
				{
					unseenRecommendedMoviesList.push(movieId);
				}
			})
		})


		// 
		let recommendListSamples = new Array();

		for(i = 0; i < unseenRecommendedMoviesList.length; i++)
		{
			let movieId = unseenRecommendedMoviesList[i];
			let movieRecommendRating = 0;
			let numberOfRecommendations = 0;
			let recommendationScore = 0;

			storedSample.forEach((sampleUser) => {
				if(!!mainSampleObject[sampleUser].recommendedList[movieId])
				{
					if(mainSampleObject[sampleUser].recommendedList[movieId].recommended)
					{
						movieRecommendRating++;
					} else {
						movieRecommendRating--;
					}
				}
				numberOfRecommendations++;
			})

			recommendationScore = (50 + movieRecommendRating * 50 / numberOfRecommendations);
			recommendListSamples.push({score: recommendationScore, movie: movieId});
		}


		let recommendedMovieList = new Object();
		this.filter(recommendListSamples).forEach((movieItem) => {
			const id = movieItem.movie;
			recommendedMovieList[id] = {
				title: this.props.moviesList.list[id].title,
				genre: this.props.moviesList.list[id].genre,
				poster: this.props.moviesList.list[id].poster,
				rated: this.props.moviesList.list[id].rated,
				released: this.props.moviesList.list[id].released,
				rating: this.props.moviesList.list[id].rating,
				score: movieItem.score
			}
		})
		this.setState(() => ({
			recommendedMovieList,
			minimumMovies: true,
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
			<div className="page-background">
				<div className="header-row">
					<div className="page-title">
						<h1>My List</h1>
					</div>
					<Options className="options-tab" />
				</div>
			    {
			    	this.state.initialization ? 
			    	<div className="find-view-container">
			    	{
			    		!!this.state.minimumMovies ?
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
										    <div className="box-loyout__bottom">
										    	<div className="box-loyout__bottom-info">
									    			<p className="box-layout__subtitle">{this.state.recommendedMovieList[movie].title}</p>
									    			<p className="box-layout__subtitle">Recommendation score: {Math.round(this.state.recommendedMovieList[movie].score * 100) / 100}</p>
									    			<p className="box-layout__subtitle">IMDb rating: {this.state.recommendedMovieList[movie].rating}</p>
												    <p className="box-layout__subtitle">Released: {this.state.recommendedMovieList[movie].released}</p>
												    <p className="box-layout__subtitle">Genre: {this.state.recommendedMovieList[movie].genre}</p>
											    </div>
											</div>
									    </div>
								    </div>
								)
				    		)
						}
				    	</div> :
				    	<div className="error-box-layout">
			                <div className="error-message">
								<h1 className="error-title">Need more movies</h1>
								<p className="error-body">You need to recommend at least 10 movies so we can find others you might like.</p>
								<button className="button" onClick={() => {
								    history.push({
								    	pathname: "/recommend",
								    	state: { previousPath: history.location}
								    });
								}}>Recommend more movies
								</button>
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
	startSetUser: (id) => dispatch(startSetUser(id)),
	startReadMovies: () => dispatch(startReadMovies()),
	startReadUsers: () => dispatch(startReadUsers()),
	startReadTempUsers: () => dispatch(startReadTempUsers())
});

const mapStateToProps = (state) => ({
	user: state.user,
	users: state.users,
	tempUsers: state.tempUsers,
	tempUser: state.tempUser,
	auth: state.auth,
	moviesList: state.movies
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPage)