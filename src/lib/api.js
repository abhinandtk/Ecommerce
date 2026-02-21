const port = "http://127.0.0.1:8000/";

const FetchProducts = async () => {
  try {
    const url = `${port}api/products/`;
  console.log("Calling:", url);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const response = await res.json();
    console.log(response,'the response');
    return response;
  } catch (error) {
      console.error("Error fetching products:", error);
    throw error; 
  }
};


export default FetchProducts