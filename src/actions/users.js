import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const readUsers = (list) => ({
	type: 'READ_USERS',
	list
});

export const startReadUsers = () => {
	return (dispatch) => {
		return database.ref(`users`).once('value').then((snapshot) => {
			const list = snapshot.val();
			dispatch(readUsers({
				...list
			}));
		})
	};
};