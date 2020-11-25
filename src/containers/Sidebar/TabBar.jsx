import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import LeaderboardIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';

import QuestionPanel from '../QuestionPanel';
import LeaderboardPanel from '../LeaderboardPanel';
import SettingsPanel from '../SettingsPanel';

const TabPanel = ({ children, selectedTabNum, i }) => (
  <div
    role="tabpanel"
    hidden={selectedTabNum !== i}
    id={`simple-tabpanel-${i}`}
    aria-labelledby={`simple-tab-${i}`}
  >
    {selectedTabNum === i && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  selectedTabNum: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
};

const tabMeta = [
  { label: 'Questions', Icon: QuestionIcon, Panel: QuestionPanel },
  { label: 'Leaderboard', Icon: LeaderboardIcon, Panel: LeaderboardPanel },
  { label: 'Settings', Icon: SettingsIcon, Panel: SettingsPanel },
];

const TabBar = () => {
  const [selectedTabNum, setSelectedTabNum] = useState(0);

  return (
    <div>
      <AppBar position="sticky" color="secondary">
        <Tabs
          value={selectedTabNum}
          onChange={(_, newValue) => setSelectedTabNum(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
        >
          {tabMeta.map(({ label, Icon }) => (
            <Tab key={label} label={label} icon={<Icon />} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={$.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={selectedTabNum}
        onChangeIndex={(i) => setSelectedTabNum(i)}
      >
        {tabMeta.map(({ Panel }, i) => (
          <TabPanel key={i} selectedTabNum={selectedTabNum} i={i}>
            <Panel />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default TabBar;
