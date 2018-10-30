import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { SelectedInfoContainer } from '../../components/SelectedInfoContainer/SelectedInfoContainer';
import { getUserWatchlist } from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      userWatchList: [],
      displayInfo: {}
    };
  }
  
  async componentDidMount() {
    // const userWatchList = await getUserWatchlist(this.props.activeUser.id);
    const userWatchList = [
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
        distance: 9.44,
        favorite: false
      },
      {
        name: "HALF PRICE GAME: Denver Broncos v Pittsburgh Steelers",
        e_id: "G5vzZ4GXuo-8c",
        url: "https://www.ticketmaster.com/half-price-game-denver-broncos-v-denver-colorado-11-25-2018/event/1E0054CF8D46142D",
        img: "https://s1.ticketm.net/dam/a/9d0/a69f7b7c-ad15-4689-9d50-c83040d8b9d0_206531_TABLET_LANDSCAPE_LARGE_16_9.jpg",
        date: "Sun, Nov 25, 2018 2:25 PM",
        venue_name: "Broncos Stadium At Mile High",
        address: "1701 Bryant St. Denver, CO 80204",
        lat: "39.743853",
        lng: "-105.020127",
        distance: 9.57,
        favorite: false
      }
    ];
    this.setState({ userWatchList });
  }

  handleSelection = (selectedFavorite) => {
    const { displayInfo } = this.state;
    if (displayInfo.e_id) {
      (selectedFavorite.e_id === displayInfo.e_id) ?
        this.setState({displayInfo: {}}) :
        this.setState({displayInfo: {...selectedFavorite}});
    } else {
      this.setState({displayInfo: {...selectedFavorite}});
    }
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
      </div>
    );
  }
}

WatchList.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

export default connect(mapStateToProps)(WatchList);
