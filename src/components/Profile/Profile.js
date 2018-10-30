import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Profile.css';

export const Profile = props => {
  const { first_name, last_name, email, imageUrl } = props.activeUser;
  return (
    <div className="user-wraper">
      <div className="user-profile">
        <img alt="the current user profile pic" src={imageUrl} />
        <div>
          <h1>User: {first_name + ' ' + last_name}</h1>
          <h2>Listed Contact: {email}</h2>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

export default connect(mapStateToProps)(Profile);
