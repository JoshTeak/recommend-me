// Expenses Reducer
const userReducerDefaultState = [];

export default (state = userReducerDefaultState, action) => {
	switch (action.type) {
		case 'READ_TEMP_USERS':
			return action.list;
		default:
			return state;
	}
};