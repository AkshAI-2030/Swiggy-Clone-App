const SavedShimmer = ({}) => {
  const shimmerCards = Array(10).fill(null);

  return (
    <div className="min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Saved Cart 🗃️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {shimmerCards.map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow animate-pulse"
          >
            <div className="bg-gray-300 h-40 w-full rounded-md mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-1 mx-auto"></div>
            <div className="h-2 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedShimmer;
