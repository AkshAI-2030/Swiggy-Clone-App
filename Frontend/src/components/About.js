import { useEffect, useState } from "react";
import ShimmerAbout from "../ShimmerUI/ShimmerAbout";

const backendURL = process.env.REACT_APP_API_URL;

const About = () => {
  const [userData, setUserData] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  let username = "AkshAI-2030";
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const profileRes = await fetch(`${backendURL}/api/v1/profile`);
        const profileData = await profileRes.json();
        setUserData(profileData);

        const reposRes = await fetch(`${backendURL}/api/v1/repos`);
        const reposData = await reposRes.json();

        const sortedRepos = reposData.slice(11, 17);
        setTopRepos(sortedRepos);
      } catch (error) {
        console.log("Error fetching GitHub data", error);
      }
    };

    fetchGitHubData();
  }, []);

  if (!userData) return <ShimmerAbout />;

  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50">
      <div className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">About Me</h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Developer on a mission to build and learn daily. Here's a snapshot
            of my GitHub profile and work.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 mb-12">
          {userData && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={userData.avatar_url}
                alt="GitHub Avatar"
                className="w-32 h-32 rounded-full shadow-md"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userData.name}
                </h2>
                <p className="text-sm text-gray-600">@{userData.login}</p>
                <p className="mt-2 text-gray-700">{userData.bio}</p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Top Repositories ⭐
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {topRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-lg text-orange-600">
                    {repo.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {repo.description}
                  </p>
                  <p className="text-xs mt-2 text-gray-500">
                    {repo.updated_at}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              GitHub Contributions
            </h3>
            <img
              src={`https://ghchart.rshah.org/${username}`}
              alt="GitHub Contributions Chart"
              className="w-full max-w-4xl mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
