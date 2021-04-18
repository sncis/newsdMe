import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import backendApiFetcher from "../apiHelpers/backendApiFetcher";
import { doLogout } from "../actions/userActions/loginActions"

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

const store = createStore(rootReducer,
    applyMiddleware(thunk.withExtraArgument(
        {backendFetcher: backendApiFetcher(() => {
            store.dispatch(doLogout())
            // console.log(error)
        }
          )}
        )
    )
)


export default store;
