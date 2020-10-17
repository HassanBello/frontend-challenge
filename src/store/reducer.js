import * as types from './types';

const initialState = {
    userId: '',
    chatId: '',
    navShow: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_AUTH_ID:
            return {
                ...state,
                userId: action.value
            }
        case types.SET_CHAT_ID:
            return {
                ...state,
                chatId: action.value
            }
        case types.SET_NAV_STATUS:
            return {
                ...state,
                navShow: !state.navShow
            }
        default:
            return state
    }
};

export default appReducer;