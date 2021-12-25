import { createStore, applyMiddleware, StoreEnhancer, StoreEnhancerStoreCreator, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

let storeEnhancer: StoreEnhancer = composeWithDevTools(applyMiddleware(thunk));
let storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore);
let store: Store = storeEnhancerStoreCreator(reducer);

export {store};

