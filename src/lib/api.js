
const port = "http://127.0.0.1:8000/";

const FetchProducts = async () => {
  const res = await fetch(`${port}api/products/`);
  return res.json();
};

const FetchCart = async (token) => {
  const res = await fetch(`${port}api/cart/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return res.json();
};

const AddToCartView = async (data,token) => {
  const res = await fetch(`${port}api/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const UpdateCartItem = async (data, token) => {
  const res = await fetch(`${port}api/cart/update_item/`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const RemoveCartItem = async (data, token) => {
  const res = await fetch(`${port}api/cart/remove_item/`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export {
  FetchProducts,
  FetchCart,
  AddToCartView,
  UpdateCartItem,
  RemoveCartItem
};