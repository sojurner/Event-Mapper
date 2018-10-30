import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { SelectedInfoContainer } from '../../components/SelectedInfoContainer/SelectedInfoContainer';
import * as call from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      userWatchList: [],
      displayInfo: {}
      currentItem: null
    };
  }

  render() {
    const displayFavorites = this.state.userWatchList.map(favorite => (
      <WatchListCard handleSelection={this.handleSelection} key={favorite.e_id} {...favorite} />
    ));
    return (
      <div className='watch-list'>
        <div className='favorites-list'>
          {displayFavorites}
        </div>
        <SelectedInfoContainer displayInfo={this.state.displayInfo} />

  handleSelection = async (event, selectedItem) => {
    event.preventDefault();
    const { displayInfo } = this.state;
  
    if (currentItem !== selectedItem.id) {
      await call.getEventWeather(
        selectedItem.lat,
        selectedItem.lng,
        selectedItem.unix
      );
      this.setState({ selectedItem, currentItem: selectedItem.id });
    } else {
      this.setState({ currentItem: null });
    }
  };

  removeEvent = async (e, event) => {
    e.preventDefault();
    const { userWatchList } = this.state;
    const response = await removeFromWatchlist(
      this.props.activeUser.id,
      event.id
    );
    const userList = userWatchList.filter(item => item.e_id !== event.e_id);
    console.log(userWatchList);
    this.setState({ userWatchList: userList, currentItem: null });
  };

  render() {
    const { displayInfo, userWatchList, currentItem } = this.state;
    const displayFavorites = userWatchList.map(item => (
      <WatchListCard
        handleSelection={this.handleSelection}
        key={item.e_id}
        item={item}
      />
    ));
    return (
      <div className="watch-list">
        <div className='favorites-list'>
          {displayFavorites}
        </div>
        {currentItem && (
          <SelectedInfoContainer
            removeEvent={this.removeEvent}
            displayInfo={displayInfo}
          />
        )}
      </div>
    );
  }
}

WatchList.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser,
  watchlist: state.watchlist
});

export default connect(mapStateToProps)(WatchList);
