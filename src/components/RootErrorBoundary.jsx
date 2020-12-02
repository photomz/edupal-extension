import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiButton from '@material-ui/core/Button';
import prop from 'prop-types';

const Snackbar = styled(MuiSnackbar)`
  margin-bottom: 96px;
`;

const RootErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      onError={() => console.log('WHOOOPS')}
      fallbackRender={({ resetErrorBoundary }) => (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open
          onClose={resetErrorBoundary}
          message="Something went wrong. Please click OK to refresh Edu-pal. This will not refresh the page."
          action={<MuiButton onClick={resetErrorBoundary}>OK</MuiButton>}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

RootErrorBoundary.defaultProps = {
  children: <></>,
};

RootErrorBoundary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: prop.any,
};

export default RootErrorBoundary;
