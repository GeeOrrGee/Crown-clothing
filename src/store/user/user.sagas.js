import { takeLatest, all, call, put, take } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user-types';
import {
    signInSuccess,
    signInFailed,
    signUpFailed,
    signUpSuccess,
    signOutSuccess,
    signOutFailed,
} from './user-action';
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* getUserAuthData(userAuth, additionalInformation = {}) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalInformation
        );
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                additionalInformation,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getUserAuthData, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getUserAuthData, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* googleSignIn() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getUserAuthData, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUpWithEmail({
    payload: { email, password, displayName },
}) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
    yield call(getUserAuthData, user, additionalInfo);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onEmailSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* googleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(googleSignInStart),
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess),
        call(onSignOut),
    ]);
}
