import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.error(err);

  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50">
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Something went wrong. We couldn’t process your request.
          </p>

          <div className="text-sm text-gray-600 mb-4">
            {err?.status && (
              <div className="font-semibold">
                Error {err.status}: {err.statusText || "Unknown Error"}
              </div>
            )}
            {err?.data && (
              <div className="mt-2">
                <pre className="bg-gray-100 text-xs text-left p-3 rounded-md overflow-auto">
                  {typeof err.data === "string"
                    ? err.data
                    : JSON.stringify(err.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <a
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Go back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
