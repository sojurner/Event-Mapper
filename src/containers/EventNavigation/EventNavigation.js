import React, { Component } from 'react';
import * as actions from '../../actions';
import { getEventsByPage } from '../../utilities/apiCalls/apiCalls';
import { connect } from 'react-redux';

import './EventNavigation.css';

class EventNavigation extends Component {
  state = {
    totalPages: [],
    pagesToShow: [],
    currentPage: 0
  };

  componentDidMount = () => {
    const { pages } = this.props.eventPages;
    const totalPages = Array.from({ length: pages }, (vim, kim) => kim);
    const pagesToShow = totalPages.filter(page => page <= 4);
    this.setState({ totalPages, pagesToShow });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (state.totalPages.length !== props.eventPages.pages) {
      const totalPages = Array.from(
        { length: props.eventPages.pages },
        (vim, kim) => kim
      );
      const pagesToShow = totalPages.filter(page => page <= 4);
      return {
        totalPages,
        pagesToShow,
        currentPage: 0
      };
    }

    return null;
  };

  handlePageChange = next => {
    const { totalPages } = this.state;
    const pagesToShow = totalPages.filter(page => {
      if (next < 4) {
        return page <= 4;
      }
      if (next >= 4) {
        return page >= next - 2 && page <= next + 2;
      }
      return page;
    });
    this.setState({ pagesToShow });
  };

  getEventsByPage = async (event, pageNum) => {
    event.preventDefault();
    const { events, setCurrentEventPage } = this.props;
    this.setState({ currentPage: (event, pageNum) });
    if (!events[pageNum]) {
      const {
        eventLinks,
        setEvents,
        setEventPageInfo,
        setEventLinkInfo
      } = this.props;
      const { rawLink } = eventLinks;
      const index = rawLink.lastIndexOf('&');
      const url = rawLink.slice(1, index - 1) + pageNum + rawLink.slice(index);
      const results = await getEventsByPage(url);
      const { events, pageInfo, linkInfo } = results;
      console.log(pageInfo);
      setEvents(events, pageInfo.current);
      setEventPageInfo(pageInfo);
      setEventLinkInfo(linkInfo);
    } else {
      setCurrentEventPage(pageNum);
    }
  };

  render() {
    const { eventPages } = this.props;
    const { pagesToShow, currentPage, totalPages } = this.state;
    return (
      <div className="page-toolbar">
        <i
          className={
            currentPage === totalPages[0]
              ? 'chevron-left-hide'
              : 'fas fa-chevron-left'
          }
          onClick={event => {
            this.getEventsByPage(event, eventPages.current - 1);
            this.handlePageChange(currentPage - 1);
          }}
        />
        <div className="page-navigation-contents">
          {pagesToShow.map(num => {
            return (
              <span
                key={`event-page-${num}`}
                className={
                  currentPage === num ? 'event-page-active' : 'event-page'
                }
                onClick={event => {
                  this.getEventsByPage(event, num);
                  this.handlePageChange(num);
                }}
              >
                {num}
              </span>
            );
          })}
        </div>
        <i
          className={
            currentPage === totalPages[totalPages.length - 1]
              ? 'chevron-right-hide'
              : 'fas fa-chevron-right'
          }
          onClick={event => {
            this.getEventsByPage(event, currentPage + 1);
            this.handlePageChange(currentPage + 1);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventPages: state.eventPages,
  eventLinks: state.eventLinks,
  events: state.events
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
