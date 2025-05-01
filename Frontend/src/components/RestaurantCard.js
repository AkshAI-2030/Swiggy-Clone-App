import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla,
    promoted,
    areaName,
    costForTwo,
  } = resData?.info;

  return (
    <div className="mx-4 my-5 p-4 w-[250px] h-[390px] rounded-lg bg-gray-100 hover:bg-gray-200 transition-transform duration-300 hover:scale-105 hover:translate-y-[-10px] relative flex flex-col overflow-y-auto scrollbar-thin">
      {promoted && (
        <label className="absolute top-2 left-2 bg-black text-white text-xs p-1 rounded-sm z-10">
          Promoted
        </label>
      )}

      <img
        className="w-full h-[150px] object-cover rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />

      <div className="flex-grow">
        <h3 className="font-bold pt-2 text-lg">{name}</h3>
        <h4 className="text-gray-600 text-sm">{cuisines.join(", ")}</h4>
        <h3 className="font-medium pt-2 text-sm">{costForTwo}</h3>
        <h3 className="font-medium pt-2 text-sm">{areaName}</h3>
      </div>

      <div className="flex items-center mt-4">
        <span className="bg-green-500 px-2 py-1 font-medium text-white rounded-md text-sm mr-3">
          {avgRating}
          {" ⭐️"}
        </span>
        <span className="font-medium">{sla?.slaString + " 🚀"}</span>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
