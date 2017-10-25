import React from 'react';
import {Link} from 'react-router-dom';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  render() {

    // to render any errors
    let errors;
    if(this.props.errors.length > 0) {
      errors = this.renderErrors(this.props.errors);
    }

    // to render the login or signup link above form
    let shortcutLink = 'SIGN UP';
    let shortcutLinkUrl = '/signup';

    // to render fields specific to new user form
    let signupFields;
    if (this.props.formType === 'signup') {
      shortcutLink = 'LOG IN';
      shortcutLinkUrl = '/login';
      signupFields = (
        <section>
          <input type="text" placeholder="First name"
            onChange={this.handleChange('fname')}
            value={this.state.fname} />
          <input type="text" placeholder="Last name"
            onChange={this.handleChange('lname')}
            value={this.state.lname} />
        </section>
      );
    }



    return (
      <section className="session-form-background">
        <form className="session-form" onSubmit={this.handleSubmit}>

          <Link to={shortcutLinkUrl} className="session-form-shortcut">
            {shortcutLink}
          </Link>

          <button className="session-demo-button">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
            LOG IN WITH DEMO
          </button>

          <p>OR</p>

          {errors}

          {signupFields}

          <input type="text" placeholder="Email"
            onChange={this.handleChange('email')}
            value={this.state.email} />

          <input type="password" placeholder="Password"
            onChange={this.handleChange('password')}
            value={this.state.password} />

          <button type="submit" className="session-submit-button"
            >
            {this.props.formType === 'login' ? 'LOG IN' : 'SIGN UP'}
          </button>

        </form>

      </section>
    );
  }

  renderErrors(errors) {
    const errorItems = this.props.errors.map((error, i)=>{
      return (
        <li key={i}>{error}</li>
      );
    });
    return (
      <ul className="errors">
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

  handleSubmit(event) {
    this.props.submitForm(this.state);
  }
}

export default SessionForm;
