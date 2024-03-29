import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { USER_ACTION_TYPES } from './user-types';
import {
    signInSuccess,
    signInFailed,
    signUpFailed,
    signUpSuccess,
    signOutSuccess,
    signOutFailed,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess,
} from './user-action';
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    additionalInformation,
} from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export function* getUserAuthData(
    userAuth: User,
    additionalInformation?: additionalInformation
) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additionalInformation
        );

        if (userSnapshot) {
            yield* put(
                signInSuccess({
                    id: userSnapshot.id,

                    ...userSnapshot.data(),
                })
            );
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getUserAuthData, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* emailSignIn({
    payload: { email, password },
}: EmailSignInStart) {
    try {
        const userCredential = yield* call(
            signInUserWithEmailAndPassword,
            email,
            password
        );
        if (userCredential) {
            const { user } = userCredential;

            yield* call(getUserAuthData, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}
export function* googleSignIn() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getUserAuthData, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUpWithEmail({
    payload: { email, password, displayName },
}: SignUpStart) {
    try {
        const userCredential = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        if (userCredential) {
            const { user } = userCredential;

            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* signInAfterSignUp({
    payload: { user, additionalInfo },
}: SignUpSuccess) {
    yield* call(getUserAuthData, user, additionalInfo);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onEmailSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* googleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onCheckUserSession() {
    yield* takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(googleSignInStart),
        call(onEmailSignInStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess),
        call(onSignOut),
    ]);
}
