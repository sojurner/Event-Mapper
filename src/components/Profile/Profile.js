import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const {first_name, last_name, email} = props.activeUser;
  return (
    <div className='user-profile'>
      <img alt='the current user profile pic' src='https://www.class-central.com/bundles/classcentralsite/images/icon-programming-and-software-development.png'/>
      <h1>User: {first_name + ' ' + last_name}</h1>
      <h2>Listed Contact: {email}</h2>
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
