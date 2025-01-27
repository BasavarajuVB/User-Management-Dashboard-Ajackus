import React, { Component } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    this.props.onRetry();
  };

  render() {
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          <FaExclamationCircle className="error-icon" />
          <p>Error: {errorMessage}</p>
          <button onClick={this.handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
