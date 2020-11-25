import React from 'react';
import { useRecoilState } from 'recoil';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import atoms from '../../atoms';

const SettingsPanel = () => {
  const [role, setRole] = useRecoilState(atoms.role);

  return (
    <Box m={4}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
