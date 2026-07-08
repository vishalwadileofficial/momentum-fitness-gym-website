import React from 'react';
import { FiAlertOctagon } from 'react-icons/fi';
import Button from './Button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Error already captured in state via getDerivedStateFromError
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 text-center bg-gym-gray-900/60 max-w-md space-y-5">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <FiAlertOctagon className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Something went wrong</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                An unexpected component rendering error occurred. Try refreshing the portal.
              </p>
              {this.state.error && (
                <p className="text-[10px] bg-gym-dark/50 border border-gym-gray-850 p-2.5 rounded font-mono text-red-400 text-left max-h-32 overflow-y-auto mt-2">
                  {this.state.error.toString()}
                </p>
              )}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" onClick={() => this.setState({ hasError: false, error: null })}>
                Reset State
              </Button>
              <Button variant="primary" onClick={this.handleReload}>
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
