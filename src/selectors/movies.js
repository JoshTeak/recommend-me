export default (movies) => {
	return movies.filter((movie) => {
		return true;
	}).sort((a, b) => {
		return a.score < b.score ? 1 : -1;				// sort function needs to return -1 if a is selected and 1 if b is selected
	});
};

