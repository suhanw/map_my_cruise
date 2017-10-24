import React from 'react';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // debugger
  }

  render() {

    let signupFields;
    if (this.props.formType === 'signup') {
      signupFields = (
        <section>
          <input type="text" placeholder="First name"
            onChange={this.handleChange('fname')} />
          <input type="text" placeholder="Last name"
            onChange={this.handleChange('lname')} />
        </section>
      );
    }

    let errors;
    if(this.props.errors.length > 0) {
      errors = this.renderErrors(this.props.errors);
    }

    return (
      <form>

        {errors}

        {signupFields}

        <input type="text" placeholder="Email"
          onChange={this.handleChange('email')}
          value={this.state.email} />

        <input type="password" placeholder="Password"
          onChange={this.handleChange('password')}
          value={this.state.password} />

        <button onClick={this.handleClick}>
          {this.props.formType === 'login' ? 'LOG IN' : 'SIGN UP'}
        </button>

      </form>
    );
  }

  renderErrors(errors) {
    const errorItems = this.props.errors.map((error)=>{
      return (
        <li>{error}</li>
      );
    });
    return (
      <ul>
        {errorItems}
      </ul>
    );
  }

  handleChange(key) {
    // debugger
    return (event) => {
      this.setState({[key]: event.target.value});
    };
  }

  handleClick(event) {
    this.props.submitForm(this.state);
  }
}

export default SessionForm;
