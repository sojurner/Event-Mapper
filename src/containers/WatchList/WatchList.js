import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToWatchList } from '../../actions';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { getUserWatchlist } from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  componentDidMount() {
    this.getUserEvents();
  }

  getUserEvents = async () => {
    const { activeUser, addToWatchList } = this.props;
    const result = await getUserWatchlist(activeUser.id);
    result.forEach(event => {
      addToWatchList(event);
    });
  };

  render() {
    const displayFavorites = this.props.watchList.map(favorite => {
      return <WatchListCard key={favorite.e_id} {...favorite} />;
    });
    return <div className="watch-list">{displayFavorites}</div>;
  }
}

WatchList.propTypes = {
  watchList: PropTypes.array
};

export const mapStateToProps = state => ({
  watchList: state.watchList,
  activeUser: state.activeUser
});

export const mapDispatchToProps = dispatch => ({
  addToWatchList: event => dispatch(addToWatchList(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchList);
