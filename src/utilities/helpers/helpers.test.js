import * as clean from './helpers';
import { mockStateUser } from '../../data/mockUser';
import {
  mockTargetEventFalse,
  mockEventsResponse
} from '../../data/mockEvents';

import * as moment from 'moment';

describe('eventServerCleaner', () => {
  it('should return the correct obj', () => {
    const expected = {
      eventObj: {
        address: '1510 Clarkson Denver, CO 80218',
        date: 'Wed, Oct 31, 2018 6:30 PM',
        distance: 0.5,
        e_id: 'G5vzZ4C58cdb-',
        img:
          'https://s1.ticketm.net/dam/a/492/732ca6af-f94f-477d-9e66-5f56f9e54492_450551_EVENT_DETAIL_PAGE_16_9.jpg',
        lat: '39.740611',
        lng: '-104.977194',
        name: 'Danzig - 30 Year Anniversary Tour',
        url: 'http://concerts.livenation.com/event/1E0054E2D0B43621',
        venue_name: 'Fillmore Auditorium (Denver)'
      },
      userObj: {
        email: 'pykim0591@gmail.com',
        family_name: 'K',
        given_name: 'Paul',
        google_id: '117977763637801404146'
      }
    };
    const result = clean.eventServerCleaner(
      mockStateUser,
      mockTargetEventFalse
    );
    expect(result).toEqual(expected);
  });
});

// describe('eventsCleaner', () => {
//   it('should return scraped events', () => {
//     const result = clean.eventsCleaner(mockEventsResponse);
//     expect(result).toEqual();
//   });
// });
