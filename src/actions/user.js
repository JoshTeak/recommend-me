import database from '../firebase/firebase';
import {firebase} from '../firebase/firebase';

export const setUser = (user) => ({
	type: 'SET_USER',
	user
});
export const startSetUser = (myId, userData = {}) => {
	return (dispatch) => {
		return database.ref(`users/${myId}`).once('value').then((snapshot) => {
			if(snapshot.val())
			{			
				return database.ref(`users/${myId}`).once('value').then((snapshot) => {
					const user = snapshot.val();
					dispatch(setUser({
						id: myId,
						...user
					}));	// todo fix if a user updates seen but then logs out and in there is no default recommendedlist = {}
				})
			} else {
				const {
					seenList = {},
					recommendedList = {},
					myList = {}
				} = userData;	
				const user = {seenList, recommendedList, myList};
				return database.ref(`users/${myId}`).update(user).then(() => {
					dispatch(setUser({
						id: myId,
						...user
					}));
				});
			}
		});
	};
};

export const editUser = (updates) => ({
	type: 'EDIT_USER',
	updates
});

export const startEditUser = (myId, updates) => {
	return (dispatch) => {
		return database.ref(`users/${myId}`).update(updates).then(() => {
			dispatch(editUser(updates))
		});
	};
};