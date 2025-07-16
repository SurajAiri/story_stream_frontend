import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

// Lazy load the main landing page component
const LazyLandingPage = lazy(() => import("./landing-main"));

// Error fallback component
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Something went wrong
      </h2>
      <p className="text-slate-400 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 text-purple-400 animate-spin mx-auto mb-4" />
      <p className="text-slate-400">Loading Story Stream...</p>
    </div>
  </div>
);

const LandingPageWrapper: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <LazyLandingPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LandingPageWrapper;
