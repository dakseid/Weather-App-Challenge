import { useState } from 'react';
import { WeatherApp } from './components/weather-app';
import { ErrorPage } from './components/error-page';
import { Button } from './components/ui/button';
import Footer from "./components/footer";

type AppState = 'home' | 'error';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('home');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleError = (error: string) => {
    setErrorMessage(error);
    setCurrentPage('error');
  };

  const handleRetry = () => {
    setCurrentPage('home');
    setErrorMessage('');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setErrorMessage('');
  };

  // For testing purposes - you can remove this in production
  const triggerTestError = () => {
    handleError('This is a test error to demonstrate the error page navigation.');
  };

  if (currentPage === 'error') {
    return (
      <ErrorPage 
        error={errorMessage}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Test button - remove in production */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={triggerTestError}
          variant="destructive"
          size="sm"
          className="opacity-50 hover:opacity-100"
        >
          Test Error Page
        </Button>
      </div>
      
      <main className="flex-grow">
        <WeatherApp onError={handleError} />
      </main>
      <Footer />
    </div>
  );
}