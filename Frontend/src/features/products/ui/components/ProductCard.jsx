function ProductCard({ product, navigate, handleDelete }) {
  return (
    <div
      onClick={() => navigate(`${product._id}`)}
      className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>

      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-5">
        <span className="text-xl font-bold text-blue-600">
          ₹{product.price}
        </span>

        <span
          className={`text-sm font-medium ${
            product.quantity > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.quantity > 0
            ? `${product.quantity} available`
            : "Out of stock"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/main/product/update/${product._id}`)
        }}
        className="w-20 mt-5 bg-green-800 text-white py-2.5 rounded-lg font-medium cursor-pointer hover:bg-green-900 transition">
          Update
        </button>
        <button
        onClick={(e) => handleDelete(e ,product._id)}
         className="w-20 mt-5 bg-red-800 text-white py-2.5 rounded-lg font-medium cursor-pointer hover:bg-red-900 transition">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
