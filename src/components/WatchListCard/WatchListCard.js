import React, { Component } from 'react';
import './WatchListCard.css';

export class WatchListCard extends Component {
  constructor() {
    super();
    this.state = {
      showInfo: false
    };
  }

  handleClick = () => {    
    this.setState({ showInfo: !this.state.showInfo });
  }

  render() {
    const { name, e_id, img, date, url, venue_name, address } = this.props;
    const toggledItems = () => {
      if (this.state.showInfo) {
        return (
          <div>
            <h2>Event Date: {date}</h2>
            <h2>Venue: {venue_name}</h2>
            <h2>Location: {address}</h2>
            <a href={url}>Event Info</a>
          </div>
        );
      } else {
        return (
          <div>test</div>
        );
      }
    };

    return (
      <div key={e_id} onClick={() => this.handleClick()}>
        <h1>{name}</h1>
        <img src={img}/>
        {toggledItems()}
      </div>
    );
  }
}
