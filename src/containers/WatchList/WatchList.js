import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import './WatchList.css';

export class WatchList extends Component {
  render() {
    const displayFavorites = this.props.watchList.map(favorite => {
      return ( 
        <WatchListCard key={favorite.e_id} {...favorite} />
      );
    });
    return (
      <div className='watch-list'>
        {displayFavorites}
      </div>
    );
  }
}

WatchList.propTypes = {
  watchList: PropTypes.array
};

export const mapStateToProps = state => ({
  watchList: state.watchList
});

export default connect(mapStateToProps, null)(WatchList);
