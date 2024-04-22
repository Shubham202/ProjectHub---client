import { combineReducers } from "redux";

const initialState = {
	user: null
};

const rootReducer = (state = initialState, action: { type: unknown; payload: unknown; }) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export default combineReducers({
	app: rootReducer
});
