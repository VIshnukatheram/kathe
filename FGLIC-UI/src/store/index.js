import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import PolicyDetailsReducer from '../reducers/policyDetailsReducer';
import ProfileReducer from '../reducers/ProfileReducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["oidc"]
}
const rootReducer = combineReducers({
    //oidc: 
    policyDetails: PolicyDetailsReducer,
    userProfileInfo: ProfileReducer,

})
const reducer = persistReducer(persistConfig, rootReducer)
let store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor }