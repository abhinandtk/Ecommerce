"use client";

import React, { useState } from "react";

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'products'
  const [hasShop, setHasShop] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [shopDetails, setShopDetails] = useState({
    name: "My Awesome Shop",
    description: "The best place to buy cool things.",
    location: "New York, USA",
  });

  // Product state
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 25.0,
      category: "Apparel",
      variants: [
        { size: "S", color: "White", stock: 10 },
        { size: "M", color: "White", stock: 15 },
      ],
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    variants: [{ size: "", color: "", stock: "" }],
  });

  const handleCreateShop = (e) => {
    e.preventDefault();
    setHasShop(true);
    setShowCreateForm(false);
  };

  const addVariantField = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, { size: "", color: "", stock: "" }],
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price),
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      variants: [{ size: "", color: "", stock: "" }],
    });
    setShowAddProductForm(false);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-serif mb-12 tracking-tight">
          Shop Management
        </h1>

        {!hasShop ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
            {!showCreateForm ? (
              <div className="text-center">
                <div className="text-5xl mb-6">🏪</div>
                <h2 className="text-2xl font-serif mb-4">No Shop Found</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  You haven't created a shop yet. Start selling your products today by setting up your shop.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all"
                >
                  Create Your Shop
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md px-6">
                <h2 className="text-2xl font-serif mb-6 text-center">Shop Details</h2>
                <form onSubmit={handleCreateShop} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                      placeholder="Enter shop name"
                      value={shopDetails.name}
                      onChange={(e) => setShopDetails({ ...shopDetails, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                      placeholder="What do you sell?"
                      rows="3"
                      value={shopDetails.description}
                      onChange={(e) => setShopDetails({ ...shopDetails, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                      placeholder="e.g. New York, USA"
                      value={shopDetails.location}
                      onChange={(e) => setShopDetails({ ...shopDetails, location: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-all"
                    >
                      Create Shop
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Shop Sidebar (Tabs) */}
            <nav className="lg:col-span-3">
              <ul className="space-y-1">
                {[
                  { name: "Shop Profile", id: "profile" },
                  { name: "My Products", id: "products" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left block py-3 px-4 -ml-4 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gray-50 text-gray-900"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Shop Content */}
            <div className="lg:col-span-9 space-y-10">
              {activeTab === "profile" ? (
                <>
                  <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6">
                        🏪
                      </div>
                      <h2 className="text-2xl font-serif text-gray-900 mb-2">{shopDetails.name}</h2>
                      <p className="text-gray-600 mb-4 max-w-lg">{shopDetails.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          📍 {shopDetails.location}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>Joined Feb 2026</span>
                      </div>
                      
                      <div className="mt-8 flex gap-4">
                        <button 
                          onClick={() => setActiveTab("products")}
                          className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-all"
                        >
                          Manage Products
                        </button>
                        <button className="px-6 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                          Edit Profile
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-full -mr-32 -mt-32 z-0"></div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                      <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                      <p className="text-2xl font-serif">$0.00</p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                      <p className="text-sm text-gray-500 mb-1">Active Products</p>
                      <p className="text-2xl font-serif">{products.length}</p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                      <p className="text-sm text-gray-500 mb-1">Store Rating</p>
                      <p className="text-2xl font-serif">N/A</p>
                    </div>
                  </section>
                </>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-serif">Product Inventory</h2>
                    <button
                      onClick={() => setShowAddProductForm(true)}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-all"
                    >
                      + Add Product
                    </button>
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
                      <p className="text-gray-500">No products added yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="py-4 font-serif font-medium text-gray-500 text-sm">Product</th>
                            <th className="py-4 font-serif font-medium text-gray-500 text-sm">Category</th>
                            <th className="py-4 font-serif font-medium text-gray-500 text-sm">Price</th>
                            <th className="py-4 font-serif font-medium text-gray-500 text-sm">Variants</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-50">
                              <td className="py-6 pr-4 font-medium text-gray-900">{product.name}</td>
                              <td className="py-6 px-4 text-sm text-gray-600">{product.category}</td>
                              <td className="py-6 px-4 text-sm font-medium">${product.price.toFixed(2)}</td>
                              <td className="py-6 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {product.variants.map((v, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">
                                      {v.size}/{v.color} ({v.stock})
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddProductForm(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-serif mb-8">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-700">Product Variants</label>
                  <button
                    type="button"
                    onClick={addVariantField}
                    className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 underline underline-offset-4"
                  >
                    + Add Variant
                  </button>
                </div>
                <div className="space-y-3">
                  {newProduct.variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <input
                        type="text"
                        placeholder="Size"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Color"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProductForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShopPage;
