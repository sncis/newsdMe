import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { shallow , mount} from "enzyme";
import { createMemoryHistory } from 'history'

import ConfirmationComponent, { ConfirmationComp} from "../../../components/Auth/ConfirmationComponent";
import {
  getConfirmedSelector,
  getRegistrationSuccessSelector,
  getResendTokenMsgSelector
} from "../../../store/selectors/userSelectors";

describe("ConfirmationComponent", ()=> {
  let component;
  let store;

  const mockStore = configureMockStore([thunk])

  beforeEach(() => {

    const history = createMemoryHistory()
    history.push('/confirm/1')
    const state= {
      userReducer:{
        confirmed:false,
        registered: true,
        resendTokenMsg:''
      }
    }
    const props = {
      match:{params:{index:"1"}},
      location:{search:''},
      confirmUser: jest.fn(),
      resendConfirmationToken: jest.fn(),
    }

    store = mockStore(state)
    store.dispatch = jest.fn();

    component = shallow(<ConfirmationComp store={store} {...props} />)

  })

  it("should render without errors", () => {

    expect(component.length).toEqual(1)
    expect(component.find(".registered").length).toEqual(1)
    expect(component.find("#resent-token-link").length).toEqual(1)

    expect(component.find(".confirmation-text-container").length).toEqual(0)
    expect(component.instance().state.index).toEqual(1)

  })


  it("should open resend form when clicking on link", () => {

    const resendLink = component.find('#resent-token-link')

    expect(component.find('#resendForm').prop('className')).toBe('hidden')

    resendLink.simulate('click')

    expect(component.find('#resendForm').prop('className')).toBe('show')

  })

  it("should resend token", () => {
    const onClickMock = jest.spyOn(component.instance(), 'handleSubmit')
    // const onResendMock = jest.spyOn(component.instance().props, 'resendConfirmationToken')

    const resendLink = component.find('#resent-token-link')
    expect(component.find('#resendForm').prop('className')).toBe('hidden')
    resendLink.simulate('click')
    expect(component.find('#resendForm').prop('className')).toBe('show')

    const emailFiled = component.find('#emailField').simulate('change',{target:{value:"some@email.com",name:'email'}})
    component.instance().handleSubmit({preventDefault(){}});

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(component.instance().props.resendConfirmationToken).toHaveBeenCalledTimes(1);
    expect(component.instance().props.resendConfirmationToken).toHaveBeenCalledWith('some@email.com');


  })

  it("should  not resend token when invalid email ", () => {
    const onClickMock = jest.spyOn(component.instance(), 'handleSubmit')
    // const onResendMock = jest.spyOn(component.instance().props, 'resendConfirmationToken')

    const resendLink = component.find('#resent-token-link')
    expect(component.find('#resendForm').prop('className')).toBe('hidden')
    resendLink.simulate('click')
    expect(component.find('#resendForm').prop('className')).toBe('show')

    component.find('#emailField').simulate('change',{target:{value:"someemail.com",name:'email'}})
    component.instance().handleSubmit({preventDefault(){}});

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(component.instance().props.resendConfirmationToken).toHaveBeenCalledTimes(0);
    expect(component.find('#errorMsg').length).toBe(1)
  })

})



describe("ConfirmationComponent with index 2", ()=> {
  let component;
  let store;

  const mockStore = configureMockStore([thunk])

  beforeEach(() => {

    // const history = createMemoryHistory()
    // history.push('/confirm/2?token=158bc2c4-cdeb-4cd6-aeb8-399ca4583bc3')
    const state= {
      userReducer:{
        confirmed:false,
        registered: true,
        resendTokenMsg:''
      }
    }
    const props = {
      match:{params:{index:"2"}},
      location:{search:'?token=158bc2c4-cdeb-4cd6-aeb8-399ca4583bc3'},
      confirmUser: jest.fn(),
      resendConfirmationToken: jest.fn(),
    }

    store = mockStore(state)
    store.dispatch = jest.fn();

    component = shallow(<ConfirmationComp store={store} {...props} />)

  })

  it("should render without errors", () => {

    expect(component.length).toEqual(1)
    expect(component.find(".registered").length).toEqual(0)
    expect(component.find("#resent-token-link").length).toEqual(0)

    expect(component.find(".confirmation-text-container").length).toEqual(1)
    expect(component.instance().state.index).toEqual(2)

  })


  it("dispatch confirm token", () => {

    const button = component.find('#confirmRegistration')

    expect(component.find('#confirmRegistration').length).toBe(1)

    button.simulate('click')

    expect(component.instance().state.token).toEqual('158bc2c4-cdeb-4cd6-aeb8-399ca4583bc3')
    expect(component.instance().props.confirmUser).toHaveBeenCalledTimes(1);
    expect(component.instance().props.confirmUser).toHaveBeenCalledWith('158bc2c4-cdeb-4cd6-aeb8-399ca4583bc3');

  })

})