import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useRecoilState } from 'recoil';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import LeaderboardIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';

import a from '../../atoms';
import QuestionPanel from '../QuestionPanel';
import LeaderboardPanel from '../LeaderboardPanel';
import SettingsPanel from '../SettingsPanel';
import ReportPanel from '../ReportPanel';

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
  { label: 'Questions', Icon: QuestionIcon, Panel: QuestionPanel },
  { label: 'Leaderboard', Icon: LeaderboardIcon, Panel: LeaderboardPanel },
  { label: 'Settings', Icon: SettingsIcon, Panel: SettingsPanel },
];

const hiddenTabs = [{ Panel: ReportPanel }];
const tabAs = [0, 1, 2, 0];

const TabBar = () => {
  const [tabOrder, setTabOrder] = useRecoilState(a.tabOrder);
  const $ = useTheme();

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Tabs
          value={tabAs[tabOrder]}
          onChange={(_, newValue) => setTabOrder(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
        >
          {visibleTabs.map(({ label, Icon }) => (
            <Tab key={label} label={label} icon={<Icon />} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={$.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabOrder}
        onChangeIndex={(i) => setTabOrder(i)}
      >
        {visibleTabs.concat(hiddenTabs).map(({ Panel }, i) => (
          <TabPanel key={i} tabOrder={tabOrder} i={i}>
            {tabOrder === i && <Panel />}
          </TabPanel>
        ))}
      </SwipeableViews>
    </>
  );
};

export default TabBar;
