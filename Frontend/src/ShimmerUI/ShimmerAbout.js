const ShimmerAbout = () => {
  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50 animate-pulse">
      <div className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="h-10 w-48 bg-gray-300 rounded mx-auto mb-4" />
          <div className="h-4 w-3/4 bg-gray-300 rounded mx-auto mb-6" />
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-5 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 rounded mt-2" />
            </div>
          </div>

          <div className="mt-10">
            <div className="h-6 w-1/4 bg-gray-300 rounded mb-4" />
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2"
                >
                  <div className="h-4 w-1/2 bg-gray-300 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="h-6 w-1/4 bg-gray-300 rounded mb-4" />
            <div className="h-40 w-full bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerAbout;
