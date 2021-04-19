import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const setTempUser = (user) => {
	return ({
		type: 'SET_TEMP_USER',
		user
	})
};

export const startSetTempUser = (userData = {}) => {
	return (dispatch) => {
		const {
			seenList = {},
			recommendedList = {},
			myList = {}
		} = userData;
		const user = {seenList, recommendedList, myList};
		return database.ref('tempUsers').push(user).then((snap) => {
			const key = snap.key
			dispatch(setTempUser({
				seenList: {},
				recommendedList: {},
				myList: {},
				uid: key,
				...user
			}));
		});
	};
};

export const editTempUser = (updates) => ({
	type: 'EDIT_TEMP_USER',
	updates
});

export const startEditTempUser = (myId, updates) => {
	return (dispatch) => {
		return database.ref(`tempUsers/${myId}`).update(updates).then(() => {
			dispatch(editTempUser(updates))
		});
	};
};