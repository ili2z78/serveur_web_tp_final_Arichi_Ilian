document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadUsers();
  loadProducts();
  loadReviews();

  // Add category form
  document.getElementById('add-category-form').addEventListener('submit', addCategory);

  // Add user form
  document.getElementById('add-user-form').addEventListener('submit', addUser);

  // Add product form
  document.getElementById('add-product-form').addEventListener('submit', addProduct);

  // Price filter
  document.getElementById('price-range').addEventListener('input', filterProducts);
});

async function loadCategories() {
  const response = await fetch('/api/categories');
  const categories = await response.json();
  const select = document.getElementById('product-category');
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat._id;
    option.textContent = cat.nom;
    select.appendChild(option);
  });
}

async function loadUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();
  const select = document.getElementById('review-user');
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user._id;
    option.textContent = user.username;
    select.appendChild(option);
  });
}

async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  displayProducts(products);
  displayProductList(products);

  const select = document.getElementById('review-product');
  select.innerHTML = '<option value="">Sélectionner un produit</option>';
  products.forEach(prod => {
    const option = document.createElement('option');
    option.value = prod._id;
    option.textContent = prod.nom;
    select.appendChild(option);
  });
}

function displayProducts(products) {
  const container = document.getElementById('product-cards');
  container.innerHTML = '';
  const maxPrice = parseInt(document.getElementById('price-range').value);
  products.filter(p => p.prix <= maxPrice).forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.nom}</h3>
      <p>Prix: ${product.prix}€</p>
      <p>Stock: ${product.stock}</p>
      <p>Catégorie: ${product.categorie ? product.categorie.nom : 'N/A'}</p>
      <p>Note moyenne: ${product.averageRating}/5</p>
      <button onclick="viewReviews('${product._id}')">Voir les avis</button>
    `;
    container.appendChild(card);
  });
}

function displayProductList(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <h3>${product.nom}</h3>
      <p>Prix: ${product.prix}€</p>
      <button onclick="deleteProduct('${product._id}')">Supprimer</button>
    `;
    container.appendChild(item);
  });
}

async function addCategory(e) {
  e.preventDefault();
  const name = document.getElementById('category-name').value;

  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom: name })
  });

  if (response.ok) {
    loadCategories();
    e.target.reset();
  } else {
    alert('Erreur lors de l\'ajout de la catégorie');
  }
}

async function addUser(e) {
  e.preventDefault();
  const username = document.getElementById('user-username').value;
  const email = document.getElementById('user-email').value;
  const role = document.getElementById('user-role').value;

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, role })
  });

  if (response.ok) {
    loadUsers();
    e.target.reset();
  } else {
    alert('Erreur lors de l\'ajout de l\'utilisateur');
  }
}

async function addProduct(e) {
  e.preventDefault();
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const stock = parseInt(document.getElementById('product-stock').value);
  const category = document.getElementById('product-category').value;

  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom: name, prix: price, stock, categorie: category })
  });

  if (response.ok) {
    loadProducts();
    e.target.reset();
  } else {
    alert('Erreur lors de l\'ajout du produit');
  }
}

async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'admin' }) 
  });

  if (response.ok) {
    loadProducts();
  } else {
    alert('Erreur lors de la suppression');
  }
}

function filterProducts() {
  const maxPrice = document.getElementById('price-range').value;
  document.getElementById('price-value').textContent = maxPrice + '€';
  loadProducts(); 
}

async function viewReviews(productId) {
  const response = await fetch(`/api/reviews/${productId}`);
  const reviews = await response.json();
  alert(reviews.map(r => `${r.auteur.username}: ${r.commentaire} (${r.note}/5)`).join('\n'));
}

async function loadReviews() {

}

document.getElementById('add-review-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('review-user').value;
  const product = document.getElementById('review-product').value;
  const comment = document.getElementById('review-comment').value;
  const rating = parseInt(document.getElementById('review-rating').value);

  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auteur: user, produit: product, commentaire: comment, note: rating })
  });

  if (response.ok) {
    loadProducts(); 
    e.target.reset();
  } else {
    alert('Erreur lors de l\'ajout de l\'avis');
  }
});
