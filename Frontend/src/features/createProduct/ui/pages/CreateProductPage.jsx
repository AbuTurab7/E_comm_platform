import { UseCreateProduct } from "../../hooks/UseCreateProduct";

function CreateProductPage() {
  const {
        register,
        handleSubmit,
        handleFormData,
        errors,
      } = UseCreateProduct();

  return (
    <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(handleFormData)}
        className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Add Product
        </h1>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>

          <input
            type="text"
            placeholder="Enter product title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 2,
                message: "Title must contain at least 2 characters",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.title?.message}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>

          <textarea
            placeholder="Enter product description"
            rows="3"
            {...register("description", {
              required: "Description is required.",
              minLength: {
                value: 20,
                message: "Description must contain at least 20 characters",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.description?.message}
          </p>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price (₹)</label>

          <input
            type="number"
            placeholder="Enter product price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price cannot be negative",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.price?.message}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>

          <input
            type="number"
            placeholder="Enter product quantity"
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Quantity cannot be negative",
              },
            })}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.quantity?.message}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;
