import { selector, atom } from 'recoil';
import { queueMessage, meetData } from './common';
import defaultParams from './mixpanelParams';

const signUpDate = atom({
  key: 'signUpDate',
  default: '',
  persistence_UNSTABLE: {
    type: 'signUpDate',
  },
});

// eslint-disable-next-line no-unused-vars
const isProd = process.env.NODE_ENV === 'production';

const peopleSet = selector({
  key: 'mixpanelPeopleSet',
  set: ({ set, get }, props) => {
    const { userId: distinctId, name, lastName, email, team } = get(meetData);
    const payload = {
      route: 'mixpanel',
      data: {
        action: 'people',
        id: distinctId,
        properties: {
          ...defaultParams.properties(),
          ...defaultParams.people_properties(),
          $first_name: name,
          $last_name: lastName,
          $created: signUpDate,
          $email: email,
          team,
          ...props,
        },
      },
    };
    set(queueMessage, payload);
  },
});

const track = selector({
  key: 'mixpanelTrack',
  set: ({ set, get }, { event, props }) => {
    const { userId: distinctId, meetingId, name } = get(meetData);
    const payload = {
      route: 'mixpanel',
      data: {
        action: 'track',
        id: event,
        properties: {
          ...defaultParams.properties(),
          distinct_id: distinctId,
          meetingId,
          name,
          ...props,
        },
      },
    };
    set(queueMessage, payload);
  },
});

export default {};
export { signUpDate, peopleSet, track };
