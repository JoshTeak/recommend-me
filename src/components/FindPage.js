import React from 'react';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';

export class FindPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {};
	};

	componentDidMount() {
		this.findNewMovie();
	}

	findNewMovie = () => {
		let i = 0;
		let mainSampleObject = this.props.users;
		delete mainSampleObject[this.props.user.id]

		let storedSample = Object.keys(mainSampleObject);
		let currentSample = new Array();

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

			if(currentSample.length > 0 && currentSample.length < 10)
			{
				storedSample = currentSample;
			}
			i = i + 1
		} while (i < Object.keys(this.props.user.recommendedList).length || currentSample.length < 0)


		let mainSample = Object.keys(mainSampleObject)[0];

		let recommendListSamples = new Array();
		i = 0;
		do {
			let movieId = Object.keys(this.props.users[mainSample].recommendedList)[i];
			let movieRecommendRating = 0;
			let numberOfRecommendations = 0;
			let recommendationScore = 0;

			if(!this.props.user.recommendedList[movieId])
			{
				storedSample.forEach((sampleUser) => {
					if(!!this.props.users[sampleUser].recommendedList)
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

			i = i + 1
		} while (i < Object.keys(this.props.users[mainSample].recommendedList).length)

		this.filter(recommendListSamples).forEach((movieItem) => {
			const id = movieItem.movie;
			this.setState(() => ({
				[id]: {
					title: this.props.moviesList[id].title,
					genre: this.props.moviesList[id].genre,
					poster: this.props.moviesList[id].poster,
					rated: this.props.moviesList[id].rated,
					released: this.props.moviesList[id].released,
					rating: this.props.moviesList[id].rating,
					score: movieItem.score
				}
			})); 
		})
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
			<div className="body">
			    {
			    	Object.keys(this.props.user).length !== 0 ? 
			    	<div className="box-layout-list">
			    	{
			    		Object.keys(this.state).map((movie) => (
				    			<div className="box-layout findPage">
						    		<p className="box-layout__subtitle">{this.state[movie].title}</p>
						    		<p className="box-layout__subtitle">{this.state[movie].score}</p>
						    		<img 
								      src={this.state[movie].poster}
								      alt="new"
								    />
								    <p className="box-layout__subtitle">{this.state[movie].released}</p>
								    <p className="box-layout__subtitle">{this.state[movie].genre}</p>
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

const mapStateToProps = (state) => ({
	user: state.user,
	users: state.users,
	moviesList: state.movies
})

export default connect(mapStateToProps)(FindPage)