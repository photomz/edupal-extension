import React, { useRef } from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { SnackbarProvider as NotiSnackbarProvider } from 'notistack';

import MuiIconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackStyles = styled.div`
  .snackbarContainer {
    margin-bottom: 96px !important;
  }
  .snackbar {
    min-width: 100px;
    max-width: 400px;
  }
  .snackbar > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  .snackbar > div > div#notistack-snackbar {
    flex-shrink: 1;
  }
  .snackbar > div > div:nth-last-child(1) {
    margin-left: 0px;
    padding-left: 0px;
  }
  .success {
    background-color: ${({ theme }) => theme.palette.success.main} !important;
  }
  .error {
    background-color: ${({ theme }) => theme.palette.error.main} !important;
  }
  .warning {
    background-color: ${({ theme }) => theme.palette.warning.main} !important;
  }
  .info {
    background-color: ${({ theme }) => theme.palette.primary.main} !important;
  }
`;

const SnackbarProvider = ({ children }) => {
  const notistackRef = useRef();
  const dismiss = (key) => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackStyles>
      <NotiSnackbarProvider
        ref={notistackRef}
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableWindowBlurListener
        autoHideDuration={8000}
        classes={{
          containerRoot: 'snackbarContainer',
          root: 'snackbar',
          variantError: 'error',
          variantSuccess: 'success',
          variantWarning: 'warning',
          variantInfo: 'info',
        }}
        action={(key) => (
          <MuiIconButton onClick={() => dismiss(key)}>
            <CloseIcon />
          </MuiIconButton>
        )}
      >
        {children}
      </NotiSnackbarProvider>
    </SnackStyles>
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
