// Expenses Reducer
const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return action.list;
		case 'READ_MOVIES':
		{
			return action.list;
		}
		default:
			return state;
	}
};