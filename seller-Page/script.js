// Replace <YOUR_KEY> with your actual CrudCrud API key
const API_URL =
  "https://crudcrud.com/api/8ebba02cd60444f58a4bbd5e72f26494/sellerPage";

const form = document.getElementById("formHandling");
const tbody = document.querySelector("#tableHandling tbody");

// Load products when page loads
window.addEventListener("DOMContentLoaded", loadProducts);

// Handle form submission to add a new product
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = document.getElementById("product").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("Category").value.trim();

  if (!product || !amount || !category) {
    alert("Please fill all fields!");
    return;
  }

  const newProduct = { product, amount, category };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    form.reset();
    loadProducts(); // reload table
  } catch (error) {
    console.error("Error adding product:", error);
  }
});

// Function to load products and display in table
async function loadProducts() {
  tbody.innerHTML = ""; // clear existing rows

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="border px-4 py-2">${p.product}</td>
        <td class="border px-4 py-2">${p.amount}</td>
        <td class="border px-4 py-2">${p.category}</td>
        <td class="border px-4 py-2">
          <button onclick="deleteProduct('${p._id}')"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Function to delete a product
async function deleteProduct(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadProducts(); // reload table after deletion
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
