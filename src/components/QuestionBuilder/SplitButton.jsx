import React, { useState, useRef } from 'react';
import prop from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const SplitButton = ({ options, value, handleChange }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.info(`You clicked ${value}`);
  };

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
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[value]}</Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select question type"
          aria-haspopup="menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
              zIndex: 10000,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {Object.entries(options).map((option) => (
                    <MenuItem
                      key={option[0]}
                      selected={option[0] === value}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      {option[1]}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
