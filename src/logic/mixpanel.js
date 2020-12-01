import { selector, atom } from 'recoil';
import { fireMessage, meetData } from './common';
import defaultParams from './mixpanelParams';

const signUpDate = atom({
  key: 'signUpDate',
  default: new Date().toISOString(),
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
      route: 'trace',
      data: {
        action: 'people',
        props: [
          distinctId,
          {
            ...defaultParams.properties(),
            ...defaultParams.people_properties(),
            $first_name: name,
            $last_name: lastName,
            $created: signUpDate,
            $email: email,
            team,
            ...props,
          },
        ],
      },
    };
    set(fireMessage, payload);
  },
});

const track = selector({
  key: 'mixpanelTrack',
  set: ({ set, get }, props) => {
    const { userId: distinctId } = get(meetData);
    const payload = {
      route: 'trace',
      data: {
        action: 'track',
        props: [distinctId, { ...defaultParams.properties(), ...props }],
      },
    };
    set(fireMessage, payload);
  },
});

export default {};
export { peopleSet, track };
