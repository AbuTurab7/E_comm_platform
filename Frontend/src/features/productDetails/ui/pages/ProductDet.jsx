import { UseGetSingleProduct } from "../../../products/hooks/UseProductHook";

function ProductDet() {
  const { data, isPending , error , navigate } = UseGetSingleProduct();

  if (isPending || error) return <h1>Loading...</h1>;

  let product = data.data.data.product;
  
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div onClick={() => navigate("/main/products")} className="text-blue-600 font-medium cursor-pointer hover:underline">
          ← Back
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <p className="mt-6 text-2xl font-semibold text-gray-900">₹{product.price}</p>
              <p className="mt-2 text-gray-600">Quantity: {product.quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDet;