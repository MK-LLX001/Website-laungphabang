import { DataRestaurants } from "../data/data.component.pupula";
import { Link } from "react-router-dom";
import { UpdateState } from "../function/Restaurants.api";
import { Toaster, toast } from "react-hot-toast";


const CheckRestaurant = () => {
  const Restau = DataRestaurants();

  // Check if Restau is an array, if not, initialize it as an empty array
  const restaurantsArray = Array.isArray(Restau) ? Restau : [];

  // Function to handle state change
  const handleStateChange = async (id, value) => {
    console.log(`ID: ${id}, New State: ${value}`);

    try {
      await UpdateState(id, value);
      toast.success("User state updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update user state");
    }
  };

  // Function to handle remove
  const handleRemove = (id) => {
    console.log(`Remove ID: ${id}`);
    // Implement your remove logic here
  };

  // Helper function to get day
  const getDay = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  return (
    <section>
      {restaurantsArray.length > 0 ? (
        restaurantsArray
          .filter((item) => item.state === "pending")
          .map((item, index) => (
            <div key={index} className="flex justify-center items-center w-full border-b border-grey pb-5 mb-4">
              <Link to={`/blog/${item.rest_id}`} className="flex gap-8 items-center w-full">
                <div className="blog-post-card w-full">
                  <div className="card flex gap-2 items-center mb-7">
                    <p className="line-clamp-1">{item.mg_name}</p>
                    <p className="">{getDay(item.created_time)}</p>
                  </div>
                  <p className="blog-title text-xl md:text-2xl">{item.rest_name}</p>
                  <p className="my-3 text-xl leading max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
                    {item.rest_description}
                  </p>
                  <div className="like-cate flex gap-2 mt-7">
                    <span className="btn-light py-1 px-4">{item.category_name}</span>
                    <span className="flex ml-4 items-center text-dark-grey">
                      <i className="fi fi-rr-social-network text-xl "></i>
                    </span>
                  </div>
                </div>
                <div className="h-28 aspect-square bg-grey">
                  <img
                    src={`${import.meta.env.VITE_SERVER_DOMAIN_IMG}/${item.rest_image}`}
                    alt=""
                    className="w-full rounded h-full aspect-square object-cover"
                  />
                </div>
              </Link>
              <div className="flex flex-col items-center ml-2">
                <button className="btn-remove-blog-post text-secondary dark bg-Secondary Dark w-28 h-14 rounded-md my-1" onClick={() => handleRemove(item.up_id)}>
                  <i className="fi fi-rr-trash text-xl"></i>
                </button>
                <select
                  value={item.state}
                  onChange={(e) => handleStateChange(item.rest_id, e.target.value)}
                  className="btn-approve-blog-post bg-blue-600 text-white flex justify-center items-center w-28 h-14 rounded-md"
                >
                  <option value="">ເລືອກ</option>
                  <option value="ຜ່ານ">ຜ່ານ</option>
                  <option value="ປະຕິເສດ">ປະຕິເສດ</option>
                </select>
              </div>
            </div>
          ))
      ) : (
        <p>No DATA...</p>
      )}
    </section>
  );
};

export default CheckRestaurant;
