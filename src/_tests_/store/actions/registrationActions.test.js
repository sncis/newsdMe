import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../../../store/types/userTypes'
import * as userActions from "../../../store/actions/userActions/registrationActions"


const configureMockStoreWithExtraArg = (fetcher)=> configureMockStore([thunk.withExtraArgument(fetcher)]);

describe("RegistrationAction", () => {
  let user
  let store

  beforeEach(() => {
    user = {"username": "someUser", "password": "somePassword"}

  })

  afterEach(() => {
    store.clearActions()
  })

  it("should dispatch registrationUserSucceeded", async () => {
    const backendFetcher = () => Promise.resolve({data:'', status:200})
    
    const mockStore = configureMockStoreWithExtraArg(backendFetcher)
    store = mockStore()

    const expectedAction = [{
      type: types.IS_LOADING,
    },
      {
        type: types.USER_REGISTER_SUCCEEDED,
        payload: {user: "someUser"}
      }]

    await store.dispatch(userActions.registerUserAction(user)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    })
  })

  it("should dispatch registrationUserFailed", async () => {
    const backendFetcher =  () => Promise.reject({message: "some error"})
    
    const mockStore = configureMockStoreWithExtraArg(backendFetcher);
    store = mockStore()

    const expectedAction = [{
      type: types.IS_LOADING,
    },
      {
        type: types.USER_REGISTRATION_FAILED,
        payload: "some error"
      }]

    await store.dispatch(userActions.registerUserAction(user)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    })
  })

  it("should dispatch confirm registration succeeded", async () => {
    const backendFetcher =  () => Promise.resolve({status: "ok"})
    
    const mockStore = configureMockStoreWithExtraArg(backendFetcher)
    store = mockStore()

    const expectedAction = [{
      type: types.IS_LOADING
    }, {
      type: types.CONFIRM_REGISTRATION_SUCCEEDED,
    }]
    await store.dispatch(userActions.confirmRegistration("some token")).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it("should dispatch confirm registration failed", async () => {
    const fetcher = () => Promise.reject({message: "some error"})
    

    const mockStore = configureMockStoreWithExtraArg(fetcher)
    store = mockStore()
    store.clearActions()


    const expectedActions = [{
      type: types.IS_LOADING
    }, {
      type: types.CONFIRM_REGISTRATION_FAILED,
      payload: "some error"
    }]

    await store.dispatch(userActions.confirmRegistration('some token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})