import React from 'react';
import Calendar from 'react-calendar';

import './DateFilter.css';

export const DateFilter = ({
  dateDisplay,
  showDate,
  getEventsByDate,
  getStartingDate,
  getEndDate,
  startDate,
  endDate
}) => {
  return (
    <div className="filter-menu">
      <div className="start-end-container">
        <section className="start-date-section">
          <h5 className="start-date-btn" onClick={e => showDate(e, 'start')}>
            Start Date:
          </h5>
          {startDate && <h5 className="start-date-input"> {startDate.date}</h5>}
        </section>
        <section className="end-date-section">
          <h5 className="end-date-btn " onClick={e => showDate(e, 'end')}>
            End Date:
          </h5>
          {endDate && <h5 className="end-date-input"> {endDate.date}</h5>}
        </section>
      </div>
      <div className="calendar-container">
        {dateDisplay.includes('start') && !startDate && (
          <Calendar
            className="start-date"
            calendarType={`ISO 8601`}
            onChange={getStartingDate}
          />
        )}
        {dateDisplay.includes('end') && !endDate && (
          <Calendar
            className="end-date"
            calendarType={`ISO 8601`}
            onChange={getEndDate}
          />
        )}
        {startDate && endDate && (
          <button className="apply-btn" onClick={e => getEventsByDate(e)}>
            Apply Filter
          </button>
        )}
      </div>
    </div>
  );
};
