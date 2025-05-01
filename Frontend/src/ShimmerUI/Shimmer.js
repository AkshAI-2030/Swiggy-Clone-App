// Shimmer.js
const Shimmer = ({ count = 6 }) => {
  return (
    <div className="body font-roboto">
      {/* Shimmer for search input and buttons */}
      <div className="filter md:flex md:items-center md:justify-center">
        <div className="search flex-col md:flex-row md:items-center text-center m-2 p-2 flex">
          {/* Group input and buttons horizontally */}
          <div className="w-60 h-8 p-2 border border-solid border-gray-300 rounded-md bg-gray-300 animate-pulse mb-2 md:mb-0 md:mr-4"></div>

          <div className="px-5 py-1 bg-gray-300 rounded-lg w-24 h-8 animate-pulse mb-2 md:mb-0 md:mr-4"></div>

          <div className="px-5 py-1 bg-gray-300 rounded-lg w-24 h-8 animate-pulse mb-2 md:mb-0"></div>
        </div>
      </div>

      {/* Shimmer for restaurant cards */}
      <div className="flex flex-wrap justify-center res-container">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="mx-3 my-2 p-4 w-[250px] h-[350px] rounded-lg bg-gray-100 animate-pulse"
          >
            <div className="w-full h-[150px] bg-gray-300 rounded-lg mb-4"></div>

            <div className="flex-grow">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            </div>

            <div className="flex items-center">
              <div className="h-8 bg-gray-300 rounded px-4 py-1 w-1/4 mr-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
