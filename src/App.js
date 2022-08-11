import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
    getCurrentUser,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import { checkCurrentUser, setCurrentUser } from './store/user/user-action';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/Shop/Shop';
import CheckoutPage from './routes/checkout/checkout.component';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkCurrentUser());
    }, [dispatch]); // this will never change but eslint errs sux
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<CheckoutPage />} />
            </Route>
        </Routes>
    );
};

export default App;
