const LoadingSpinner = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      data-testid="loading-spinner"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <p className="text-sm font-medium text-slate-600">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;
