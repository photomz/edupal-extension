import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import MuiButton from '@material-ui/core/Button';
import MuiButtonGroup from '@material-ui/core/ButtonGroup';
import MuiOutsideClick from '@material-ui/core/ClickAwayListener';
import MuiGrow from '@material-ui/core/Grow';
import MuiPaper from '@material-ui/core/Paper';
import MuiPopper from '@material-ui/core/Popper';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const FixedButton = styled(MuiButton)`
  min-width: 160px;
`;

const SplitButton = ({ options, value, handleChange }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleMenuItemClick = ([newVal]) => {
    handleChange(newVal);
    setOpen(false);
  };

  const handleClose = (event) => {
    if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
      setOpen(false);
    }
  };

  return (
    <>
      <MuiButtonGroup
        variant="outlined"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <FixedButton onClick={() => setOpen((prev) => !prev)}>
          {options[value]}
        </FixedButton>
        <MuiButton
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select question type"
          aria-haspopup="menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ArrowDropDownIcon />
        </MuiButton>
      </MuiButtonGroup>
      <MuiPopper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps, placement }) => (
          <MuiGrow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
              zIndex: 10000,
            }}
          >
            <MuiPaper>
              <MuiOutsideClick onClickAway={handleClose}>
                <MuiMenuList id="split-button-menu">
                  {Object.entries(options).map((option) => (
                    <MuiMenuItem
                      key={option[0]}
                      selected={option[0] === value}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      {option[1]}
                    </MuiMenuItem>
                  ))}
                </MuiMenuList>
              </MuiOutsideClick>
            </MuiPaper>
          </MuiGrow>
        )}
      </MuiPopper>
    </>
  );
};

SplitButton.defaultProps = {
  options: {
    MCQ: 'Multiple Choice',
    MultiSelect: 'Multi-Select',
    TrueFalse: 'True or False',
    ShortAnswer: 'Short Answer',
  },
};

SplitButton.propTypes = {
  options: prop.objectOf(prop.string),
  value: prop.string.isRequired,
  handleChange: prop.func.isRequired,
};

export default SplitButton;
