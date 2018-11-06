import React from 'react';
import PropTypes from 'prop-types';

const ForgotPasswordForm = ({
  onChange,
  onSave,
  username,
  email,
}) => (
  <div className="reset-container container">
    <div className="panel-body">
      <div className="text-center resetPasswordForm">
        <h3><i className="fa fa-lock fa-4x" /></h3>
        <h2 className="text-center">Forgot Password?</h2>
        <p>Enter your username and email here to receive a reset link.</p>
        <div className="panel-body">
          <div role="form" autoComplete="off" className="form">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fas fa-user" /></div>
                </div>
                <input id="username" name="username" placeholder="username" value={username} className="form-control" type="text" onChange={onChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fas fa-envelope" /></div>
                </div>
                <input id="email" name="email" placeholder="email address" value={email} className="form-control" type="email" onChange={onChange} />
              </div>
            </div>
            <div className="form-group">
              <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Submit" type="submit" onClick={onSave} />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

ForgotPasswordForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};


export default ForgotPasswordForm;
