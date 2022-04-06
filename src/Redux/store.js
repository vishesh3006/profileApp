import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './Reducers/rootReducer';
import thunk from 'redux-thunk'
import {getFirebase} from 'react-redux-firebase'
import {getFirestore} from 'redux-firestore'

const middleware = [thunk]
export const store = createStore(rootReducer,
         applyMiddleware(...middleware)
)