import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const readTempUsers = (list) => ({
	type: 'READ_TEMP_USERS',
	list
});

export const startReadTempUsers = () => {
	return (dispatch) => {
		return database.ref(`tempUsers`).once('value').then((snapshot) => {
			const list = snapshot.val();
			dispatch(readTempUsers({
				...list
			}));
		})
	};
};