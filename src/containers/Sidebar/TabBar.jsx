import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import LeaderboardIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Create';

import a from '../../atoms';
import QuestionPanel from '../QuestionPanel';
import LeaderboardPanel from '../LeaderboardPanel';
import SettingsPanel from '../SettingsPanel';
import ReportPanel from '../ReportPanel';
import CreatePanel from '../CreatePanel';

const TabPanel = ({ children, tabOrder, i }) => (
  <div
    role="tabpanel"
    hidden={tabOrder !== i}
    id={`simple-tabpanel-${i}`}
    aria-labelledby={`simple-tab-${i}`}
  >
    {tabOrder === i && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  tabOrder: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
};

const visibleTabs = [
  {
    label: 'Create',
    Icon: CreateIcon,
    Panel: CreatePanel,
    condition: (role) => role === 'TEACHER',
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
  { Panel: ReportPanel, condition: (role) => role === 'TEACHER' },
];
const tabAs = {
  STUDENT: [0, 1, 2],
  TEACHER: [0, 1, 2, 3, 1],
};

const TabBar = () => {
  const [tabOrder, setTabOrder] = useRecoilState(a.tabOrder);
  const role = useRecoilValue(a.role);
  const $ = useTheme();

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Tabs
          value={tabAs[role][tabOrder]}
          onChange={(_, newValue) => setTabOrder(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
        >
          {visibleTabs
            .filter(({ condition }) => condition(role))
            .map(({ label, Icon }) => (
              <Tab key={label} label={label} icon={<Icon />} />
            ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={$.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabOrder}
        onChangeIndex={(i) => setTabOrder(i)}
      >
        {visibleTabs
          .concat(hiddenTabs)
          .filter(({ condition }) => condition(role))
          .map(({ Panel }, i) => (
            <TabPanel key={i} tabOrder={tabOrder} i={i}>
              <Panel />
            </TabPanel>
          ))}
      </SwipeableViews>
    </>
  );
};

export default TabBar;
