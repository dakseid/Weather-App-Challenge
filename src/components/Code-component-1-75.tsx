import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ErrorPageProps {
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export function ErrorPage({ 
  error = "Something went wrong", 
  onRetry, 
  onGoHome 
}: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        
        <p className="text-muted-foreground mb-6">
          {error}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {onGoHome && (
            <Button 
              onClick={onGoHome} 
              className="w-full"
              variant="outline"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please try:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Checking your internet connection</li>
            <li>• Refreshing the page</li>
            <li>• Trying a different location</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}