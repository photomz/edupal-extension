import React from 'react';
import prop from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    // eslint-disable-next-line no-console
    console.warn(error, errorInfo);
    this.setState({
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;
    return hasError ? fallback : children;
  }
}

ErrorBoundary.defaultProps = {
  fallback: (
    <h4>
      Something went wrong. We don&apos;t know what, but we&apos;re working hard
      to fix it.
    </h4>
  ),
  children: <></>,
};

ErrorBoundary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fallback: prop.any,
  children: prop.oneOfType([prop.element, prop.string, prop.node]),
};

export default ErrorBoundary;
