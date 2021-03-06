import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signOut,
    getAuth, //authentication protocol
    signInWithRedirect, //redirect sign in
    signInWithPopup, //pop up
    GoogleAuthProvider, //auth provider (could be facebook and etc.)
    createUserWithEmailAndPassword, //email/password sign in/up type auth
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDePph4Tm03eArW8fsch_FRkKyf4XJaVto',
    authDomain: 'crwn-clothing-db-7173f.firebaseapp.com',
    projectId: 'crwn-clothing-db-7173f',
    storageBucket: 'crwn-clothing-db-7173f.appspot.com',
    messagingSenderId: '18453764579',
    appId: '1:18453764579:web:9df1da64364ecba1b728d6',
};

//storing  data to the database
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db); // creating collection

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase()); //specifying docRef path 'collection=>title' for each object
        batch.set(docRef, object); // setting the data/objects to specified docRef path
    }); // specifying the place to store the collection
    await batch.commit();
};

//fetching Categories data from firestore db
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); //specifying the path

    const q = query(collectionRef); // creates a query reference (f.e. useful in transaction, if one side of operation fails, second one doesn't proceed / cancels)
    const querySnapshot = await getDocs(q); // fetchs data and then takes a snapshot(storing it)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data(); //goes through data and destructuring it
        acc[title.toLowerCase()] = items; // applying data to the relevant title (title: [{data}])

        return acc;
    }, {});
    // console.log(categoryMap);
    return categoryMap;
};

const firebaseApp = initializeApp(firebaseConfig); //firebase initialization

const provider = new GoogleAuthProvider(); //storing provider service

provider.setCustomParameters({
    prompt: 'select_account',
}); //type of authentication service

export const auth = getAuth(); //storing authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); //setting pop up log in method
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(); //storing database

// checks whether user exists or not, thus fetchs userDocRef or otherwise sets it in the DB(manually setting username in case of redirect/email-password sign in method)

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

// email/password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

//sign in with email/pass
export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
