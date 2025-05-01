const Offline = () => {
  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50">
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">
            You're Offline
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            It seems like you're not connected to the internet. <br />
            Please check your connection and try again.
          </p>

          <div className="flex justify-center mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10c4.418-4.418 11.582-4.418 16 0m-2 2a7.5 7.5 0 00-12 0M9 14a3 3 0 016 0m-3 4h.01M12 20a.5.5 0 01-.01 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
