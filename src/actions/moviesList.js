import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const readMovies = (list) => ({
	type: 'READ_MOVIES',
	list,
	randomList: shuffle(Object.keys(list))
});

export const startReadMovies = () => {
	return (dispatch) => {
		return database.ref(`movieList`).once('value').then((snapshot) => {
			const list = snapshot.val();
			dispatch(readMovies({
				...list
			}));
		})
	};
};

export const setMovies = (list) => ({
	type: 'SET_MOVIES',
	list
});

export const startSetMovies = (list) => {
	return (dispatch) => {
		return database.ref(`movieList`).update(list).then(() => {
			dispatch(setMovies(list))
		});
	};
};

export const shuffleMovies = (list) => ({
	type: 'SHUFFLE_MOVIES',
	randomList: shuffle(Object.keys(list))
});

export const startShuffleMovies = () => {
	return (dispatch) => {
		return database.ref(`movieList`).once('value').then((snapshot) => {
			const list = snapshot.val();
			dispatch(shuffleMovies({
				...list
			}));
		})
	};
};

const shuffle = (array) => {
  let currentIndex = array.length; 
  let temporaryValue; 
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}