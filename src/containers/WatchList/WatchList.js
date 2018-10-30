import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { SelectedWatchlist } from '../../components/SelectedWatchlist/SelectedWatchlist';
import * as call from '../../utilities/apiCalls/apiCalls';

import {
  getUserWatchlist,
  removeFromWatchlist
} from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      userWatchList: [],
      selectedItem: {},
      currentItem: null
    };
  }

  async componentDidMount() {
    const userWatchList = await getUserWatchlist(this.props.activeUser.id);
    this.setState({ userWatchList });
  }

  handleSelection = async (event, selectedItem) => {
    const { currentItem } = this.state;
    event.preventDefault();
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
    const { selectedItem, userWatchList, currentItem } = this.state;
    const displayFavorites = userWatchList.map(item => (
      <WatchListCard
        handleSelection={this.handleSelection}
        key={item.e_id}
        item={item}
      />
    ));
    return (
      <div className="watch-list">
        {displayFavorites}
        {currentItem && (
          <SelectedWatchlist
            removeEvent={this.removeEvent}
            item={selectedItem}
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
