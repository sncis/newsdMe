import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import backendApiFetcher from "../apiHelpers/backendApiFetcher";
import { logoutAction } from "../actions/userActions/loginActions"

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

const store = createStore(rootReducer,
    // applyMiddleware(thunk.withExtraArgument(backendApiFetcher)
    applyMiddleware(thunk.withExtraArgument(backendApiFetcher(() => {store.dispatch(logoutAction())}))
    )
)


export default store;
