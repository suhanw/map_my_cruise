import React from 'react';

class ProfileForm extends React.Component {

  constructor(props){
    super(props);

    this.state = this.props.currentUser;
    this.state = Object.assign(
      this.state,
      {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render(){
    const currentUser = this.state;

    const avatarUrl = currentUser.imageUrl || currentUser.avatar_url;

    return (
      <section>
        <form className="profile-form">
          <h2>MY PERSONAL PROFILE</h2>
          <small className="required-legend">Required</small>
          <img src={avatarUrl} className="avatar-preview"/>
          <label className="profile-form-avatar-upload">
            <input type="file"  name="avatar" className="file-input"
              onChange={this.handleUpload}/>
            <small className="field-caption">
              Please select an image less than 1 megabyte in size.
            </small>
          </label>

          <label className="profile-form-input">
            <div className="asterisk">First Name</div>
            <input type="text" name="fname" value={currentUser.fname}
              onChange={this.handleChange('fname')}/>
            <small className="field-caption">
              May only contain letters, spaces, hyphens, and apostrophes, see privacy policy.
            </small>
          </label>
          <label className="profile-form-input">
            <div className="asterisk">Last Name</div>
            <input type="text" name="lname" value={currentUser.lname}
              onChange={this.handleChange('lname')}/>
            <small className="field-caption">
              May only contain letters, spaces, hyphens, and apostrophes, see privacy policy.
            </small>
          </label>
        </form>

        <form className="account-form">
          <h2>ACCOUNT SETTINGS</h2>
          <label className="account-form-input">
            <div className="asterisk">Email Address</div>
            <input type="text" name="email" value={currentUser.email}
              onChange={this.handleChange('email')}/>
          </label>
          <label className="account-form-input">
            Old Password
            <input type="password" name="old-password"
              onChange={this.handleChange('oldPassword')} />
          </label>
          <label className="account-form-input">
            New Password
            <input type="password" name="new-password"
              onChange={this.handleChange('newPassword')} />
          </label>
          <label className="account-form-input">
            Confirm New Password
            <input type="password" name="confirm-new-password"
              onChange={this.handleChange('confirmNewPassword')} />
          </label>

          <label className="form-save">
            <button type="button" onClick={this.handleClick}>SAVE</button>
          </label>
        </form>
      </section>
    );
  }

  handleChange(key) {
    return (e) => {
      this.setState({[key]: e.target.value});
    };
  }

  handleUpload(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () => (
      this.setState({
        imageUrl: reader.result,
        imageFile: file,
      })
    );


    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        imageUrl: '',
        imageFile: null,
      });
    }
  }

  handleClick(e){
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);
    formData.append("user[email]", this.state.email);

    const file = this.state.imageFile;
    if (file) formData.append("user[image]", file);
    debugger

    this.props.editProfile(formData);
  }
}

export default ProfileForm;
