// Expenses Reducer
const userReducerDefaultState = [];

export default (state = userReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEMP_USER':
			return action.user;
		case 'EDIT_TEMP_USER':
		{
			return {
				...state,
				...action.updates
			};
		}
		default:
			return state;
	}
};