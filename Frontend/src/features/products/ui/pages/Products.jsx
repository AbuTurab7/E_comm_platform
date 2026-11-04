import {
  UseDeleteProduct,
  UseGetAllProducts,
} from "../../hooks/UseProductHook";
import ProductCard from "../components/ProductCard";

function Products() {
  let { data, isPending, error, navigate } = UseGetAllProducts();
  let { handleDelete } = UseDeleteProduct();

  if (isPending || error) return <h1>Loading...</h1>;

  let products = data.data.data.products;

  return (
    <div className="min-h-[90vh] bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <button
            onClick={() => navigate("/main/product/create")}
            className="w-40 mt-5 bg-blue-600 text-white py-2.5 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition "
          >
            Create Product
          </button>
        </div>

        {/* Products */}
        { products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                navigate={navigate}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <h1>No products available...</h1>
        )}
      </div>
    </div>
  );
}

export default Products;
