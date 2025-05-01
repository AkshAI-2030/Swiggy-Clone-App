import { useParams } from "react-router";
import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import RestaurantMenuShimmer from "../ShimmerUI/RestaurantMenuShimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState();

  if (!resInfo) {
    return <RestaurantMenuShimmer />;
  }

  const handleChangeIndex = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const { name, city, cuisines, costForTwoMessage, cloudinaryImageId } =
    resInfo?.cards[2]?.card?.card.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (each) =>
        each?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="min-h-screen text-center mb-40">
      {/* Floating Image Section */}
      <div className="relative w-full">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant Banner"
          className="w-full md:h-[300px] h-[150px] object-cover brightness-75 rounded-md shadow-lg"
        />
      </div>

      {/* Restaurant Info */}
      <h1 className="font-bold text-4xl md:text-5xl underline mt-6">Menu</h1>
      <h2 className="font-bold text-3xl my-4 md:text-4xl">{name}</h2>
      <h2 className="md:text-2xl">{city}</h2>
      <p className="md:text-2xl mb-5">
        Cuisines: - {cuisines ? cuisines.join(", ") : "No cuisines available"} -{" "}
        {costForTwoMessage || "Cost info not available"}
      </p>

      {/* Categories List */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.categoryId}
          data={category?.card?.card}
          index={index}
          showItems={index === showIndex}
          handleChangeIndex={handleChangeIndex}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
