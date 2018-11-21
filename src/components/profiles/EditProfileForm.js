import React from 'react';
import PropTypes from 'prop-types';

const EditProfileForm = (props) => {
  const {
    username, bio, handleChange, handleSubmit,
  } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="modal fade" id="editProfileModal" role="dialog" aria-hidden="true" style={{ marginTop: 100 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProfileModal">
                  Personal information
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="edit-profile-form">
                  <div className="form-group">
                    <label className="control-label" htmlFor="username">Username</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-user" /></div>
                      </div>
                      <input type="text" name="username" className="form-control" id="username" value={username} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="bio">Bio</label>
                    <div className="input-group mb-2">
                      <textarea name="bio" className="form-control" id="bio" value={bio} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-outline-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditProfileForm.propTypes = {
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditProfileForm;
