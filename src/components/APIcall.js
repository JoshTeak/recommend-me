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
	this.setState(() => ({
		movie: {
			title: data.Title,
			id: data.imdbID, 
			genre: data.Genre,
			poster: data.Poster,
			rated: data.Rated,
			released: data.Released,
			rating: data.imdbRating
		},
		movieCount: this.state.movieCount + 1
	}));      
})
.catch(err => {
    console.log(err);
}); 