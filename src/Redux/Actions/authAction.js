import * as types from '../types'
import 'firebase/compat/auth';
import {firebase, auth, googleProvider, db, emailProvider} from '../../firebase'

const logoutStart = () => ({
    type: types.LOGOUT_START
})

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS
})

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
})

const googleSignInStart = () => ({
    type: types.GOOGLE_SIGN_IN_START
})

const googleSignInSuccess = (user) => ({
    type: types.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

const googleSignInFail = (error) => ({
    type: types.GOOGLE_SIGN_IN_FAIL,
    payload: error,
})

const anonymousSignInStart = () => ({
    type: types.ANONYMOUS_SIGN_IN_START
})

const anonymousSignInSuccess = (user) => ({
    type: types.ANONYMOUS_SIGN_IN_SUCCESS,
    payload: user
})

const anonymousSignInFail = (error) => ({
    type: types.ANONYMOUS_SIGN_IN_FAIL,
    payload: error,
})

export const updateUserStatus = (status) => ({
    type: types.UPDATE_USER_STATUS,
    payload: status
})

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user
})

export const logoutInitiate = () => {
    return (dispatch) => {
        dispatch(logoutStart());
        auth
            .signOut()
            .then(() => {
                dispatch(logoutSuccess())
            })
            .catch((error) => dispatch(logoutFail(error.message)));
    }
}

export const googleSignInInitiate = () => {
    return (dispatch) => {
        dispatch(googleSignInStart());
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(async ({user}) => {
                const uid = user.uid;
                console.log(uid)
                
                const promise = new Promise(async() => {
                    await db.collection('users').doc(uid)
                    .get()
                    .then(async(value) => {
                        console.log("in collection")
                        console.log(value.exists)
                        if(!value.exists){
                            console.log("in value")
                            await db.collection('users').doc(uid).set({
                                name: user.displayName,
                                email: user.email,
                                uid: user.uid,
                                image: user.photoURL,
                                likeCount: 0,
                                dislikeCount: 0,
                                favourite: [],
                                likeArray: [],
                                dislikeArray: [],
                                status: '',
                                timestamp: + new Date()
                            })
                        }
                    })
                })
                    promise.then(() => {
                        console.log('hi haa')
                        dispatch(googleSignInSuccess(user))
                    })
                    .catch((error) => console.error(error))
            })
            .catch((error) => dispatch(googleSignInFail(error.message)));
    }
}

export const anonymousSignInInintiate = () => {
    return (dispatch) => {
        dispatch(anonymousSignInStart());
        if(localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('password')){
            auth.signInWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('password'))
                .then(({user}) => {
                    dispatch(anonymousSignInSuccess(user));
                }).catch((error) => {
                    dispatch(anonymousSignInFail(error.message));
                })
            return;
        }
        auth
            .signInAnonymously()
            .then( async({user}) => {
                console.log(user)
                const uid = user.uid;
                // localStorage.setItem('uid', uid);
                const promise = new Promise(async () => {
                    await db.collection('users').doc(uid)
                    .get()
                    .then(async(value) => {
                        console.log("value: " + value)
                        console.log("in here")
                        if(!value.exists){
                            fetch("https://randomuser.me/api/")
                                .then((respons) => respons.json())
                                .then(async(res) => {
                                    console.log(res);
                                    const result = res.results[0]
                                    await db.collection('users').doc(uid).set({
                                        name: result.name.first + " " + result.name.last,
                                        email: result.email,
                                        uid: user.uid,
                                        image: result.picture.large,
                                        likeCount: 0,
                                        dislikeCount: 0,
                                        favourite: [],
                                        likeArray: [],
                                        dislikeArray: [],
                                        status: '',
                                        timestamp: + new Date()
                                    })

                                    const email = result.email;
                                    const password = result.login.password;
                                    const credentials = firebase.auth.EmailAuthProvider.credential(email, password);
                                    user.linkWithCredential(credentials)
                                        .then((userCred) => {
                                            const user = userCred.user;
                                            console.log("Anonymous account successfully upgraded", user);
                                            localStorage.setItem('uid', uid);
                                            localStorage.setItem('email', email);
                                            localStorage.setItem('password', password);
                                        }).catch((error) => {
                                            console.log("Error upgrading anonymous account", error);
                                        });

                                })
                        }
                    })
                })
                    promise.then(() => {
                        dispatch(anonymousSignInSuccess(user))
                    })
            })
            .catch((error) => dispatch(anonymousSignInFail(error.message)));
    }
}