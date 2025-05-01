const RestaurantMenuShimmer = () => {
  return (
    <div className="text-center animate-pulse">
      {/* Floating Image Placeholder */}
      <div className="relative w-full">
        <div className="w-full h-[150px] md:h-[300px] bg-gray-300 rounded-md shadow-lg"></div>
      </div>

      {/* Restaurant Info Placeholder */}
      <div className="mt-6 px-4 md:px-0">
        <div className="h-8 md:h-10 bg-gray-300 rounded-md w-1/4 mx-auto mb-6"></div>{" "}
        {/* Menu title */}
        <div className="h-6 md:h-8 bg-gray-300 rounded-md w-1/3 mx-auto mb-4"></div>{" "}
        {/* Restaurant name */}
        <div className="h-5 md:h-7 bg-gray-300 rounded-md w-1/5 mx-auto mb-2"></div>{" "}
        {/* City */}
        <div className="h-4 md:h-6 bg-gray-300 rounded-md w-1/3 mx-auto mb-8"></div>{" "}
        {/* Cuisines */}
      </div>

      {/* Categories List Placeholder */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto space-y-6">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              {/* Category Title Placeholder */}
              {/* <div className="h-6 bg-gray-300 rounded-md w-1/2 mb-4 mx-auto"></div> */}

              {/* List of Items Placeholder */}
              <div className="space-y-4">
                {Array(3)
                  .fill("")
                  .map((__, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
                      </div>
                      <div className="w-16 h-16 bg-gray-300 rounded-md"></div>{" "}
                      {/* Item Image */}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenuShimmer;
