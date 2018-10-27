import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import './WatchList.css';

export class WatchList extends Component {

  render() {
    const testEvents = [
      {
        name: "P!NK: BEAUTIFUL TRAUMA WORLD TOUR",
        e_id: "G5vzZ4amDV3z0",
        url: "https://www.altitudetickets.com/events/detail/pink-2019",
        img: "https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_RETINA_PORTRAIT_3_2.jpg",
        date: "Mon, Apr 1, 2019 7:30 PM",
        venue_name: "Pepsi Center",
        address: "1000 Chopper Circle Denver, CO 80204",
        lat: "39.74724",
        lng: "-105.010166",
        distance: 3.57,
        favorite: false
      },
      {
        name: "Another event",
        e_id: "cool",
        url: "https://www.altitudetickets.com/events/detail/pink-2019",
        img: "https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_RETINA_PORTRAIT_3_2.jpg",
        date: "Mon, Apr 1, 2019 7:30 PM",
        venue_name: "Pepsi Center",
        address: "1000 Chopper Circle Denver, CO 80204",
        lat: "39.74724",
        lng: "-105.010166",
        distance: 3.57,
        favorite: false
      }
    ];
    const displayFavorites = testEvents.map(favorite => {
      // const { name, e_id, img, date, url, venue_name, address } = favorite.event;
      return ( 
        <WatchListCard key={favorite.e_id} {...favorite} />
        // <WatchListCard key={favorite.e_id} {...favorite.event} />
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

export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
