import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { getUserWatchlist } from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      userWatchList: [],
      selectedFavorite: {}
    };
  }
  
  async componentDidMount() {
    const userWatchList = await getUserWatchlist(this.props.activeUser.id);
    this.setState({ userWatchList });
  }

  handleSelection(eventItems) {
    console.log(eventItems);
    // const newSelectedFavorite = this.state.userWatchList.reduce((selected, favorite) => {
    //   if(eventItems.e_id === ) {

    //   }
    // }, {});
  }

  render() {
    const displayFavorites = this.state.userWatchList.map(favorite => (
      <WatchListCard handleSelection={() => this.handleSelection()} key={favorite.e_id} {...favorite} />
    ));
    return <div className="watch-list">{displayFavorites}</div>;
  }
}

WatchList.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

export default connect(mapStateToProps)(WatchList);
