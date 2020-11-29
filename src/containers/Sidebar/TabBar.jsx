/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useTheme } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';

import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import LeaderboardIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Create';

import QuestionPanel from '../QuestionPanel';
import LeaderboardPanel from '../LeaderboardPanel';
import SettingsPanel from '../SettingsPanel';
import ReportPanel from '../ReportPanel';
import CreatePanel from '../CreatePanel';
import { tabOrder, role } from '../../logic/common';

const TabPanel = ({ children, order, i }) => (
  <div
    role="tabpanel"
    hidden={order !== i}
    id={`simple-tabpanel-${i}`}
    aria-labelledby={`simple-tab-${i}`}
  >
    {order === i && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  order: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
};

const visibleTabs = [
  {
    label: 'Create',
    Icon: CreateIcon,
    Panel: CreatePanel,
    condition: (userRole) => userRole === 'TEACHER',
  },
  {
    label: 'Questions',
    Icon: QuestionIcon,
    Panel: QuestionPanel,
    condition: () => true,
  },
  {
    label: 'Leaderboard',
    Icon: LeaderboardIcon,
    Panel: LeaderboardPanel,
    condition: () => true,
  },
  {
    label: 'Settings',
    Icon: SettingsIcon,
    Panel: SettingsPanel,
    condition: () => true,
  },
];

const hiddenTabs = [
  { Panel: ReportPanel, condition: (userRole) => userRole === 'TEACHER' },
];
const tabAs = {
  STUDENT: [0, 1, 2],
  TEACHER: [0, 1, 2, 3, 1],
};

const TabBar = () => {
  const [order, setOrder] = useRecoilState(tabOrder);
  const userRole = useRecoilValue(role);
  const $ = useTheme();

  return (
    <>
      <MuiAppBar position="sticky" color="secondary">
        <MuiTabs
          value={tabAs[userRole][order]}
          onChange={(_, newValue) => setOrder(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
        >
          {visibleTabs
            .filter(({ condition }) => condition(userRole))
            .map(({ label, Icon }) => (
              <MuiTab key={label} label={label} icon={<Icon />} />
            ))}
        </MuiTabs>
      </MuiAppBar>
      {visibleTabs
        .concat(hiddenTabs)
        .filter(({ condition }) => condition(userRole))
        .map(({ Panel }, i) => (
          <TabPanel key={i} order={order} i={i}>
            <Panel />
          </TabPanel>
        ))}
    </>
  );
};

export default TabBar;
