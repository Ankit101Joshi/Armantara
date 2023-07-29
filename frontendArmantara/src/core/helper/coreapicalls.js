import { API } from "../../backend";

export const getProducts = async () => {
  try {
    const response = await fetch(`${API}/products`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to fetch products" };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to fetch product" };
  }
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
