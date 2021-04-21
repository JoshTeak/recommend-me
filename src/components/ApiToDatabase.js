import React from 'react';
import { connect } from 'react-redux';
import movieList from './MovieList';
import {startSetMovies} from '../actions/moviesList';
import LoadingPage from './LoadingPage';

export class AdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			moviesList: {}
		};
	};

	uniqueMovies = () => {
		const movieArray = movieList();
		const uniqueArray = movieArray.filter((value, index, self) => {
			return self.indexOf(value) === index;
		})
		let i;
		let string = '';
		let string2 = '';
		for(i = 0; i < uniqueArray.length; i++)
		{
			string2 = `\"${uniqueArray[i]}\",\n`;
			string = string.concat(string2);
		}
		console.log(string);
	}

	findNewMovie = () => {
		let movieName;
		let i = 0;		
		do {
			movieName = movieList()[i]
			this.sendFirstRequest(movieName);
			i = i + 1
		} while ( i < movieList().length)
	}

	sendFirstRequest = (title) => {
		const s = title
		const page = "1";
		const r = "json";

		fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${s}&page=${page}&r=${r}`, {
	        "method": "GET",
	        "headers": {
	            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	            "x-rapidapi-key": "71d3ffd036mshd45bd0954c60419p15dfeajsn5269874cdaf9"
	        }
	    })
	    .then(response => response.json()) // Getting the actual response data
	    .then(data => { 
	    	this.sendSecondRequest(data.Search[0].imdbID)
	    })
	    .catch(err => {
	        console.log(err);
	    }); 
	}

	sendSecondRequest = (movieId) => {
		const i = movieId;
		const r = "json";

		fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${i}&page=&r=${r}`, {
		    "method": "GET",
		    "headers": {
		        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		        "x-rapidapi-key": "71d3ffd036mshd45bd0954c60419p15dfeajsn5269874cdaf9"
		    },

		})
		.then(response => response.json()) // Getting the actual response data
		.then(data => { 
			console.log(...this.state.moviesList)
			console.log(data.imdbID)
			this.setState(() => ({
				moviesList: {
	    			...this.state.moviesList,
	    			[data.imdbID]: {
						title: data.Title,
						genre: data.Genre,
						poster: data.Poster,
						rated: data.Rated,
						released: data.Released,
						rating: data.imdbRating
					}
				}
			}));      
		})
		.catch(err => {
		    console.log(err);
		}); 
	}

	submit = () => {
		this.props.startSetMovies(this.state.moviesList);
	}

	render() {
		return (
			<div>
				<button onClick={this.uniqueMovies}>Print unique movies</button>
				<button onClick={this.findNewMovie}>send requests</button>
			    <button onClick={this.submit}>upload to database</button>
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
	startSetMovies: (list) => dispatch(startSetMovies(list))
});

export default connect(undefined, mapDispatchToProps)(AdminPage)
