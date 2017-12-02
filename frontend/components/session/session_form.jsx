import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner';
import Modal from '../modals/modal';
import FormErrorModal from '../modals/form_error_modal';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      loading: false,
    };

    this.demoEmailTimer = 0;
    this.demoPasswordTimer = 0;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.renderDemoEmail = this.renderDemoEmail.bind(this);
    this.renderDemoPassword = this.renderDemoPassword.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
    // to render the login or signup link above form
    let shortcutLink = 'SIGN UP';
    let shortcutLinkUrl = '/signup';

    // to render fields specific to new user form
    let signupFields;
    let spinnerMessage = 'log you in!';
    if (this.props.formType === 'signup') {
      spinnerMessage = 'sign you up!';
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

        <Modal modal={this.props.modal}
          errors = {this.props.errors}
          component={FormErrorModal}
          closeModal={this.props.closeModal} />

        {this.state.loading ?
          (
            <div className="spinner-backdrop">
              <Spinner
                spinnerType="session"
                spinnerMessage={`HANG ON while we ${spinnerMessage}`} />
            </div>
          ) : null
        }

        <section className="session-form">
          <Link to={shortcutLinkUrl} className="session-form-shortcut">
            {shortcutLink}
          </Link>

          <button className="session-demo-button" onClick={this.demoLogin}>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
            LOG IN WITH DEMO
          </button>

          <p>OR</p>
        </section>

        <form className="session-form" onSubmit={this.handleSubmit}>

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

  componentDidMount() {
    if (this.props.location.pathname.includes('demo')) {
      this.renderDemoEmail('eh@mi.com'.split(''));
    }
  }

  renderDemoEmail(email) {
    if (!email.length) {
      clearTimeout(this.demoEmailTimer);
      this.demoEmailTimer = 0;
      this.renderDemoPassword('reallylongpassword'.split(''));
      return;
    }
    let newEmail = this.state.email + email.shift();
    this.setState({email: newEmail});
    const that = this;
    this.demoEmailTimer = setTimeout(()=>that.renderDemoEmail(email), 50);
  }

  renderDemoPassword(password) {
    if (!password.length) {
      clearTimeout(this.demoPasswordTimer);
      this.demoPasswordTimer = 0;
      this.demoLogin();
      return;
    }
    let newPassword = this.state.password + password.shift();
    this.setState({password: newPassword});
    const that = this;
    this.demoPasswordTimer = setTimeout(()=>that.renderDemoPassword(password), 50);
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
    return (event) => {
      this.setState({[key]: event.target.value});
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitForm(this.state).then(
      () => {
        this.setState({loading: false});
        this.props.history.push('/dashboard');
      },
      () => {
        this.setState({loading: false});
        this.props.openModal('errors');
      }
    );
    this.setState({loading: true});
  }

  demoLogin() {
    this.props.login({
      email: 'eh@mi.com',
      password: 'testing',
    }).then(
      () => this.props.history.push('/dashboard')
    );
    this.setState({loading: true});
  }
}

export default SessionForm;
