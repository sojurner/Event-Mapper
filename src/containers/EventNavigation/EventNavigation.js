import React, { Component } from 'react';
import * as actions from '../../actions';
import { getEventsByPage } from '../../utilities/apiCalls/apiCalls';
import { connect } from 'react-redux';

import './EventNavigation.css';

class EventNavigation extends Component {
  state = {};

  getEventsByPage = async pageNum => {
    const {
      eventLinks,
      setEvents,
      setEventPageInfo,
      setEventLinkInfo
    } = this.props;
    const { next } = eventLinks;
    const index = next.lastIndexOf('&');
    const url = next.slice(1, index - 1) + pageNum + next.slice(index);

    const results = await getEventsByPage(url);
    const { events, pageInfo, linkInfo } = results;
    setEvents(events, pageInfo.current);
    setEventPageInfo(pageInfo);
    setEventLinkInfo(linkInfo);
  };

  render() {
    const { eventPages } = this.props;
    return (
      <div className="page-toolbar">
        <i
          className="fas fa-chevron-left"
          onClick={this.getEventsByPage.bind(null, eventPages.current - 1)}
        />
        <div className="page-navigation-contents">
          {Array.from({ length: eventPages.pages }, (vim, kim) => kim).map(
            num => {
              return (
                <span
                  key={`event-page-${num}`}
                  className={
                    eventPages.current === num
                      ? 'event-page-active'
                      : 'event-page'
                  }
                  onClick={this.getEventsByPage.bind(null, num)}
                >
                  {num}
                </span>
              );
            }
          )}
        </div>
        <i
          className="fas fa-chevron-right"
          onClick={this.getEventsByPage.bind(null, eventPages.current + 1)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventPages: state.eventPages,
  eventLinks: state.eventLinks
});

const mapDispatchToProps = dispatch => ({
  setCurrentEventPage: page => dispatch(actions.setCurrentEventPage(page)),
  setEvents: (events, current) => dispatch(actions.setEvents(events, current)),
  setEventLinkInfo: links => dispatch(actions.setEventLinkInfo(links)),
  setEventPageInfo: pages => dispatch(actions.setEventPageInfo(pages))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventNavigation);
