import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabBar = () => {
  const c = useStyles();
  const theme = useTheme();
  const [selectedTabNum, setSelectedTabNum] = useState(0);

  return (
    <div className={c.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTabNum}
          onChange={(_, newValue) => setSelectedTabNum(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {tabMeta.map(({ label, Icon }, i) => (
            <Tab
              key={label}
              label={label}
              id={`simple-tab-${i}`}
              aria-controls={`simple-tabpanel-${i}`}
              icon={<Icon />}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
