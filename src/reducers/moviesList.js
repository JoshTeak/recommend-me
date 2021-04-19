// Expenses Reducer
const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return action.list;
		case 'READ_MOVIES':
		{
			return {list: action.list, randomList: action.randomList};
		}
		case 'SHUFFLE_MOVIES':
		{
			return {randomList: action.randomList};
		}
		default:
			return state;
	}
};