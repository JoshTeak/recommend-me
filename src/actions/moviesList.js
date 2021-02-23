import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const readMovies = (list) => ({
	type: 'READ_MOVIES',
	list
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