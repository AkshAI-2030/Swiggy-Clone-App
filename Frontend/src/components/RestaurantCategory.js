import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, index, handleChangeIndex }) => {
  const handleClick = () => {
    handleChangeIndex(index);
  };
  return (
    <div>
      {/** Header */}
      <div className="w-10/12 md:w-8/12 mx-auto my-2 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-lg font-bold">
            {data?.title} ({data?.itemCards?.length})
          </span>
          <span className="text-xl">{showItems ? "⬆️" : "⬇️"}</span>
        </div>
        {showItems && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
