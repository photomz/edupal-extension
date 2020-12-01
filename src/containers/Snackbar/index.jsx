import React, { useRef } from 'react';
import prop from 'prop-types';
import { SnackbarProvider as NotiSnackbarProvider } from 'notistack';

import MuiIconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackbarProvider = ({ children }) => {
  const notistackRef = useRef();
  const dismiss = (key) => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <NotiSnackbarProvider
      ref={notistackRef}
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      disableWindowBlurListener
      autoHideDuration={8000}
      classes={{ containerRoot: 'snackbarOverride' }}
      action={(key) => (
        <MuiIconButton onClick={() => dismiss(key)}>
          <CloseIcon />
        </MuiIconButton>
      )}
    >
      {children}
    </NotiSnackbarProvider>
  );
};

SnackbarProvider.defaultProps = {
  children: () => <></>,
};

SnackbarProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: prop.any,
};

export default SnackbarProvider;
