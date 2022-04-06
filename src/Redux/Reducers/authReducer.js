import * as types from '../types'

const initState = {
    loading: false,
    error: null,
    currentUser: null,
};

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case types.LOGOUT_START:
        case types.GOOGLE_SIGN_IN_START:
        case types.ANONYMOUS_SIGN_IN_START:
            return {
                ...state,
                loading: true
            }
        case types.SET_USER:
        case types.GOOGLE_SIGN_IN_SUCCESS:
        case types.ANONYMOUS_SIGN_IN_SUCCESS:
            return{
                ...state,
                loading: false,
                currentUser: action.payload
            }
        
        case types.LOGOUT_SUCCESS:
            return{
                ...state,
                currentUser: null
            }
        case types.LOGOUT_FAIL:
        case types.ANONYMOUS_SIGN_IN_FAIL:
        case types.GOOGLE_SIGN_IN_FAIL:
            return {
                ...state, 
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;