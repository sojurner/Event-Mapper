import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  render() {
    const { gid, first_name } = this.props.activeUser;
    return (
      <nav className="nav-container">
        <h1 className="greeting">{`Hello, ${first_name}`}</h1>
        <NavLink className="nav-link" exact to={`/`}>
          Home
        </NavLink>
        <NavLink className="nav-link" to={`/${gid}/profile`}>
          Profile
        </NavLink>
        <NavLink className="nav-link" to={`/${gid}/favorites`}>
          Favorites
        </NavLink>
      </nav>
    );
    // const loggedIn = () => {
    //   return (
    //     <div className='nav-container'>
    //       <h1>{`Hello, ${first_name}`}</h1>
    //       <div className='button-container'>
    //         <Link to={`/app/${gid}/profile`}>
    //           <button className='main-button'>Your Profile</button>
    //         </Link>
    //         <Link to={`/app/${gid}/favorites`}>
    //           <button className='main-button'>Favorites</button>
    //         </Link>
    //       </div>
    //     </div>
    //   );
    // };

    // const favorites = () => {
    //   return (
    //     <div className='nav-container'>
    //       <div className='button-container'>
    //         <Link to={`/app/${gid}/profile`}>
    //           <button className='main-button'>Your Profile</button>
    //         </Link>
    //         <Link to={`/app`}>
    //           <button className='main-button'>Current Events</button>
    //         </Link>
    //       </div>
    //     </div>
    //   );
    // };

    // const profile = () => {
    //   return (
    //     <div className='nav-container'>
    //       <Link to={`/app/${gid}/favorites`}>
    //         <button className='main-button'>Favorites</button>
    //       </Link>
    //       <Link to={`/app`}>
    //         <button className='main-button'>Current Events</button>
    //       </Link>
    //     </div>
    //   );
    // };

    //   return (
    //     <div className='main-nav'>
    //       <Route exact path={`/app`} component={loggedIn}></Route>
    //       <Route exact path={`/app/${gid}/favorites`} component={favorites}></Route>
    //       <Route exact path={`/app/${gid}/profile`} component={profile}></Route>
    //     </div>
    //   );
  }
}

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

NavBar.propTypes = {
  activeUser: PropTypes.object
};

export default connect(mapStateToProps)(NavBar);
