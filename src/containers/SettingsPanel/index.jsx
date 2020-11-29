import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiFormLabel from '@material-ui/core/FormLabel';
import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';

import { role, tabOrder } from '../../logic/common';

const SettingsPanel = () => {
  const [userRole, setUserRole] = useRecoilState(role);
  const setTabs = useSetRecoilState(tabOrder);

  return (
    <MuiBox m={4}>
      <MuiFormControl component="fieldset">
        <MuiFormLabel component="legend">Role</MuiFormLabel>
        <MuiRadioGroup
          aria-label="role"
          name="role"
          value={userRole}
          onChange={(e) => {
            const newRole = e.target.value;
            setUserRole(newRole);
            setTabs(newRole === 'TEACHER' ? 3 : newRole === 'STUDENT' && 2);
          }}
        >
          <MuiFormControlLabel
            value="STUDENT"
            control={<MuiRadio />}
            label="Student"
          />
          <MuiFormControlLabel
            value="TEACHER"
            control={<MuiRadio />}
            label="Teacher"
          />
        </MuiRadioGroup>
      </MuiFormControl>

      <MuiTypography style={{ marginTop: 16 }}>
        Let us know how we&apos;re doing! Drop an email at&nbsp;
        <a href="mailto:edupal.group@gmail.com?subject=Beta Feedback">
          edupal.group@gmail.com
        </a>
      </MuiTypography>
    </MuiBox>
  );
};

export default SettingsPanel;
