import React from 'react';
import PropTypes from 'prop-types';

const ResetPasswordForm = ({
  onChange,
  onSave,
  password1,
  password2,
}) => (
  <div className="container reset-container">
    <div className="panel-body">
      <div className="text-center resetPasswordForm">
        <h3><i className="fa fa-lock-open fa-4x" /></h3>
        <h2 className="text-center">Reset Password</h2>
        <p>Change your password here and login again</p>
        <div className="panel-body">
          <div role="form" autoComplete="off" className="form">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fas fa-lock" /></div>
                </div>
                <input id="password1" name="password1" placeholder="password" value={password1} className="form-control" type="password" onChange={onChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text"><i className="fas fa-lock" /></div>
                </div>
                <input id="password2" name="password2" placeholder="confirm password" value={password2} className="form-control" type="password" onChange={onChange} />
              </div>
            </div>
            <div className="form-group">
              <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset" type="submit" onClick={onSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  password1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
