import RestaurantCard from "./RestaurantCard";
import { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "../ShimmerUI/Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import Offline from "./Offline";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { CgSortAz, CgSortZa } from "react-icons/cg";

const backendURL = process.env.REACT_APP_API_URL;

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const onlineStatus = useOnlineStatus();

  const RestaurantCardWithPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${backendURL}/api/v1/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      const list =
        json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setListOfRestaurants(list);
      setFilteredRestaurants(list);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  const handleSearch = useCallback(() => {
    const filtered = listOfRestaurants.filter((each) =>
      each?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [listOfRestaurants, searchText]);

  const handleSort = (order) => {
    const sorted = [...filteredRestaurants].sort((a, b) => {
      const ratingA = parseFloat(a?.info?.avgRating) || 0;
      const ratingB = parseFloat(b?.info?.avgRating) || 0;
      return order === "desc" ? ratingB - ratingA : ratingA - ratingB;
    });
    setFilteredRestaurants(sorted);
  };

  if (onlineStatus === false) return <Offline />;
  if (listOfRestaurants.length === 0)
    return <Shimmer count={filteredRestaurants.length || 15} />;

  return (
    <div className="body font-roboto min-h-screen mb-40 mt-12">
      <div className="filter w-full flex flex-col md:flex-row md:items-center md:justify-center gap-4 px-4 py-3">
        <input
          type="search"
          placeholder="Search restaurants..."
          className="w-full md:w-64 h-10 px-3 py-1 border border-gray-300 rounded-md text-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button
          className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg text-md hover:bg-orange-700 transition-all duration-150"
          onClick={handleSearch}
        >
          Search 🔎
        </button>

        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-all duration-150"
          onClick={() => {
            const nextSort = sortOrder === "desc" ? "asc" : "desc";
            setSortOrder(nextSort);
            handleSort(nextSort);
          }}
        >
          {sortOrder === "asc" ? "Rating High to Low" : "Rating Low to High"}
          {sortOrder === "asc" ? (
            <CgSortAz className="text-2xl" />
          ) : (
            <CgSortZa className="text-2xl" />
          )}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap justify-center res-container">
        {filteredRestaurants?.length === 0 ? (
          <h2 className="text-center font-semibold text-lg text-gray-700 border border-b-gray-300 shadow-lg my-4 p-4 rounded-lg">
            ☹️ No items found. Please try a different search.
          </h2>
        ) : (
          filteredRestaurants?.map((each) => (
            <Link to={"/restaurants/" + each?.info?.id} key={each?.info?.id}>
              {each?.info?.promoted === true ? (
                <RestaurantCardWithPromoted resData={each} />
              ) : (
                <RestaurantCard resData={each} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
