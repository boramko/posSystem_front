import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    console.error('Caught an errors:', error)
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
