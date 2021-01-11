import React, { Component } from "react";
import "./ContactData.css";

class ContactData extends Component {
  state = {
    ingredients: [],
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      console.log(param);
      this.state.ingredients.push(param);
    }
  }

  setName = n => {
    this.setState({
      name: n
    })
  };

  setEmail = mail => {
    this.setState({
      email: mail
    })
  }

  // setAdress = 

  orderHandler = event => {
    // for not reloading the page and the form
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="ContactData">
        <h4>enter your contact data</h4>
        <form>
          <input
            type="text"
            name="name"
            placeholder="your name"
            onChange={e => this.setName(e.target.value)}
          />
          <input type="email" name="email" placeholder="your email" />
          <input type="text" name="street" placeholder="your street" />
          <input type="text" name="postalCode" placeholder="your postalCode" />
          <input
            type="submit"
            name="submit"
            value="submit"
            onClick={this.orderHandler}
          />
        </form>
      </div>
    );
  }
}

export default ContactData;
