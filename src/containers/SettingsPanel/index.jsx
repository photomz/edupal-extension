import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import a from '../../atoms';

const SettingsPanel = () => {
  const [role, setRole] = useRecoilState(a.role);
  const setTabs = useSetRecoilState(a.tabOrder);

  return (
    <Box m={4}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => {
            const newRole = e.target.value;
            setRole(newRole);
            setTabs(newRole === 'TEACHER' ? 3 : newRole === 'STUDENT' && 2);
          }}
        >
          <FormControlLabel
            value="STUDENT"
            control={<Radio />}
            label="Student"
          />
          <FormControlLabel
            value="TEACHER"
            control={<Radio />}
            label="Teacher"
          />
        </RadioGroup>
      </FormControl>

      <Typography style={{ marginTop: 16 }}>
        Let us know how we&apos;re doing! Drop an email at&nbsp;
        <a href="mailto:edupal.group@gmail.com?subject=Beta Feedback">
          edupal.group@gmail.com
        </a>
      </Typography>
    </Box>
  );
};

export default SettingsPanel;
