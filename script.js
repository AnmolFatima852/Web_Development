/*****************************************************
 *  LOAD PRODUCTS FROM DATABASE
 *****************************************************/
var products = [];
var customers = [
    {id:1, name:'Ali Raza', email:'ali@example.com', pass:'pass123', phone:'+92 300 1234567', orders:5, joined:'2024-10-01', status:'Active'},
    {id:2, name:'Sara Khan', email:'sara@example.com', pass:'pass123', phone:'+92 311 9876543', orders:2, joined:'2024-11-15', status:'Active'}
];

var cart = {};
var currentUser = null;
var wishlist = [];
var activeFilter = 'all';
var nextId = 9;
var subscribers = [];

// Theme
var savedTheme = localStorage.getItem('luxe-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('luxe-theme', newTheme);
}

function getPrice(p) {
    // Handle both database formats
    var price = Number(p.price);
    var sale = Number(p.sale || p.sale_price || 0);
    var onSale = p.on_sale;
    if (typeof onSale === 'string') onSale = (onSale === '1' || onSale === 'true');
    if (onSale && sale > 0 && sale < price) return sale;
    return price;
}

function getImage(p) {
    if (p.img) return p.img;
    if (p.image) return p.image;
    return 'https://placehold.co/400x300/111827/f0a500?text=Product';
}

function getDesc(p) {
    return p.desc || p.description || '';
}

// ========== LOAD PRODUCTS FROM DATABASE ==========
function loadProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_products.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                products = JSON.parse(xhr.responseText);
            } catch(e) {
                console.log('Error loading products');
            }
        }
        buildFilterChips();
        renderProducts();
        updateCartBadge();
    };
    xhr.onerror = function() {
        console.log('Could not load products');
    };
    xhr.send();
}

// ========== FILTER & RENDER ==========
function buildFilterChips() {
    var categories = [];
    for (var i = 0; i < products.length; i++) {
        var cat = products[i].category;
        if (cat && categories.indexOf(cat) === -1) categories.push(cat);
    }
    var row = document.getElementById('filter-row');
    if (!row) return;
    row.innerHTML = '<button class="filter-chip active" onclick="setFilter(\'all\', this)">All</button>';
    for (var j = 0; j < categories.length; j++) {
        var btn = document.createElement('button');
        btn.className = 'filter-chip';
        btn.textContent = categories[j];
        btn.setAttribute('onclick', 'setFilter(\'' + categories[j] + '\', this)');
        row.appendChild(btn);
    }
}

function setFilter(cat, btn) {
    activeFilter = cat;
    var chips = document.getElementsByClassName('filter-chip');
    for (var i = 0; i < chips.length; i++) chips[i].classList.remove('active');
    if (btn) btn.classList.add('active');
    renderProducts();
}

function applyFilters() { renderProducts(); }

function renderProducts() {
    var searchText = '';
    var searchInput = document.getElementById('search-input');
    if (searchInput) searchText = searchInput.value.toLowerCase();
    
    var filtered = [];
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        var matchCat = (activeFilter === 'all' || p.category === activeFilter);
        var matchSearch = true;
        if (searchText) {
            matchSearch = (p.name && p.name.toLowerCase().indexOf(searchText) !== -1) ||
                          (getDesc(p).toLowerCase().indexOf(searchText) !== -1) ||
                          (p.category && p.category.toLowerCase().indexOf(searchText) !== -1);
        }
        if (matchCat && matchSearch) filtered.push(p);
    }
    
    var grid = document.getElementById('products-grid');
    if (!grid) return;
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text3);font-size:16px">No products found</div>';
        return;
    }
    
    var html = '';
    for (var j = 0; j < filtered.length; j++) {
        var p = filtered[j];
        var price = getPrice(p);
        var stock = parseInt(p.stock) || 0;
        var stockPct = Math.min(100, Math.round(stock / 60 * 100));
        var isWished = (wishlist.indexOf(p.id) !== -1);
        
        html += '<div class="product-card">';
        if (p.on_sale && Number(p.sale) > 0 && Number(p.sale) < Number(p.price)) {
            html += '<div class="sale-ribbon">Sale</div>';
        }
        html += '<button class="wish-btn" onclick="toggleWishlist(' + p.id + ', this)">' + (isWished ? '❤️' : '🤍') + '</button>';
        html += '<div class="product-img-wrap" style="cursor:pointer"><img src="' + getImage(p) + '" alt="' + (p.name || 'Product') + '"></div>';
        html += '<div class="product-body">';
        html += '<div class="product-cat">' + (p.category || '') + '</div>';
        html += '<div class="product-name">' + (p.name || '') + '</div>';
        html += '<div class="product-desc">' + getDesc(p) + '</div>';
        html += '<div class="product-price"><span class="price-now">Rs ' + price.toLocaleString() + '</span>';
        if (Number(p.sale) > 0 && Number(p.sale) < Number(p.price)) {
            html += '<span class="price-old">Rs ' + Number(p.price).toLocaleString() + '</span>';
        }
        html += '</div>';
        html += '<div style="font-size:11px;color:var(--text3);margin-bottom:8px">' + stock + ' in stock</div>';
        if (stock > 0) {
            html += '<button class="add-cart-btn" onclick="addToCart(' + p.id + ')">🛒 Add to Cart</button>';
        } else {
            html += '<button class="add-cart-btn out" disabled>Out of Stock</button>';
        }
        html += '</div></div>';
    }
    grid.innerHTML = html;
}

function toggleWishlist(id, btn) {
    var pos = wishlist.indexOf(id);
    if (pos !== -1) wishlist.splice(pos, 1);
    else wishlist.push(id);
    renderProducts();
}

// ========== CART ==========
function getCartCount() {
    var count = 0;
    var keys = Object.keys(cart);
    for (var i = 0; i < keys.length; i++) count += cart[keys[i]];
    return count;
}

function getCartTotal() {
    var total = 0;
    var keys = Object.keys(cart);
    for (var i = 0; i < keys.length; i++) {
        var pid = parseInt(keys[i]);
        var p = null;
        for (var j = 0; j < products.length; j++) { 
            if (products[j].id == pid) { p = products[j]; break; } 
        }
        if (p) total += getPrice(p) * cart[keys[i]];
    }
    return total;
}

function addToCart(pid) {
    var p = null;
    for (var i = 0; i < products.length; i++) { 
        if (products[i].id == pid) { p = products[i]; break; } 
    }
    if (!p || parseInt(p.stock) <= 0) return;
    cart[pid] = (cart[pid] || 0) + 1;
    updateCartBadge();
    renderCart();
    alert((p.name || 'Product') + ' added to cart!');
}

function updateCartBadge() {
    var badge = document.getElementById('cart-badge');
    if (badge) badge.textContent = getCartCount();
}

function removeFromCart(pid) { delete cart[pid]; updateCartBadge(); renderCart(); }

function changeQty(pid, delta) {
    var cur = cart[pid] || 0, next = cur + delta;
    if (next <= 0) removeFromCart(pid);
    else { cart[pid] = next; updateCartBadge(); renderCart(); }
}

function clearCart() { cart = {}; updateCartBadge(); renderCart(); }

function renderCart() {
    var list = document.getElementById('cart-items-list');
    var footer = document.getElementById('cart-footer');
    var keys = Object.keys(cart);
    if (keys.length === 0) {
        list.innerHTML = '<div class="cart-empty"><span class="cart-empty-icon">🛒</span><span style="font-size:15px;font-weight:600">Your cart is empty</span></div>';
        footer.style.display = 'none';
        return;
    }
    footer.style.display = 'block';
    var html = '';
    for (var i = 0; i < keys.length; i++) {
        var pid = parseInt(keys[i]), qty = cart[keys[i]], p = null;
        for (var j = 0; j < products.length; j++) { 
            if (products[j].id == pid) { p = products[j]; break; } 
        }
        if (!p) continue;
        var price = getPrice(p);
        html += '<div class="cart-item"><img class="cart-item-img" src="' + getImage(p) + '"><div class="cart-item-info"><div class="cart-item-name">' + (p.name || 'Product') + '</div><div class="cart-item-price">Rs ' + (price * qty).toLocaleString() + '</div><div class="qty-controls"><button class="qty-btn" onclick="changeQty(' + p.id + ', -1)">-</button><span class="qty-num">' + qty + '</span><button class="qty-btn" onclick="changeQty(' + p.id + ', 1)">+</button></div></div><button class="cart-item-del" onclick="removeFromCart(' + p.id + ')">X</button></div>';
    }
    list.innerHTML = html;
    var sub = getCartTotal(), tax = sub * 0.08, grand = sub + tax;
    document.getElementById('cart-summary').innerHTML = '<div class="cart-summary-row"><span>Subtotal</span><span class="s-val">Rs ' + sub.toLocaleString() + '</span></div><div class="cart-summary-row"><span>Tax (8%)</span><span class="s-val">Rs ' + tax.toLocaleString() + '</span></div><div class="cart-summary-row"><span>Grand Total</span><span class="s-val">Rs ' + grand.toLocaleString() + '</span></div>';
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    renderCart();
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

// ========== CHECKOUT ==========
function openCheckout() {
    if (getCartCount() === 0) { alert('Cart is empty!'); return; }
    closeCart();
    if (currentUser) {
        document.getElementById('ch-name').value = currentUser.name || '';
        document.getElementById('ch-email').value = currentUser.email || '';
        document.getElementById('ch-phone').value = currentUser.phone || '';
    } else {
        document.getElementById('ch-name').value = '';
        document.getElementById('ch-email').value = '';
        document.getElementById('ch-phone').value = '';
    }
    var itemsHTML = '';
    var keys = Object.keys(cart);
    for (var i = 0; i < keys.length; i++) {
        var pid = parseInt(keys[i]), qty = cart[keys[i]], p = null;
        for (var j = 0; j < products.length; j++) { if (products[j].id == pid) { p = products[j]; break; } }
        if (!p) continue;
        var ep = getPrice(p);
        itemsHTML += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span>' + (p.name || 'Product') + ' x' + qty + '</span><span style="font-weight:700;color:var(--accent)">Rs ' + (ep * qty).toLocaleString() + '</span></div>';
    }
    document.getElementById('checkout-items-list').innerHTML = itemsHTML;
    var sub = getCartTotal(), tax = sub * 0.08, grand = sub + tax;
    document.getElementById('checkout-totals').innerHTML = '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px"><span>Subtotal</span><span>Rs ' + sub.toLocaleString() + '</span></div><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px"><span>Tax (8%)</span><span>Rs ' + tax.toLocaleString() + '</span></div><div style="display:flex;justify-content:space-between;font-size:17px;font-weight:800;color:var(--accent);border-top:1px solid var(--border);padding-top:10px;margin-top:6px"><span>Grand Total</span><span>Rs ' + grand.toLocaleString() + '</span></div>';
    openModal('checkout-modal');
}

function confirmOrder() {
    var name = document.getElementById('ch-name').value.trim();
    var email = document.getElementById('ch-email').value.trim();
    var phone = document.getElementById('ch-phone').value.trim();
    var addr = document.getElementById('ch-addr').value.trim();
    var payment = document.getElementById('ch-payment').value;
    
    if (!name || !email || !addr) { alert('Please fill all delivery details!'); return; }
    
    var cartSummary = '';
    var sub = 0;
    var keys = Object.keys(cart);
    for (var i = 0; i < keys.length; i++) {
        var pid = parseInt(keys[i]), qty = cart[keys[i]], p = null;
        for (var j = 0; j < products.length; j++) { if (products[j].id == pid) { p = products[j]; break; } }
        if (!p) continue;
        var ep = getPrice(p);
        cartSummary += (p.name || 'Product') + ' x' + qty + ' = Rs ' + (ep * qty).toLocaleString() + '\n';
        sub += ep * qty;
    }
    var tax = sub * 0.08;
    var grand = sub + tax;
    cartSummary += '\nTotal: Rs ' + grand.toLocaleString();
    
    var url = 'order_success.php';
    url += '?cust_name=' + encodeURIComponent(name);
    url += '&email=' + encodeURIComponent(email);
    url += '&phone=' + encodeURIComponent(phone);
    url += '&address=' + encodeURIComponent(addr);
    url += '&payment=' + encodeURIComponent(payment);
    url += '&items=' + encodeURIComponent(cartSummary);
    url += '&grand_total=' + grand;
    
    cart = {};
    updateCartBadge();
    renderCart();
    closeModal('checkout-modal');
    window.location.href = url;
}

// ========== AUTH ==========
function openAuthModal() { openModal('auth-modal'); }

function switchTab(tab) {
    if (tab === 'login') {
        document.getElementById('form-login').classList.remove('hidden');
        document.getElementById('form-register').classList.add('hidden');
    } else {
        document.getElementById('form-login').classList.add('hidden');
        document.getElementById('form-register').classList.remove('hidden');
    }
}

function doLogin() {
    var email = document.getElementById('l-email').value.trim();
    var pass = document.getElementById('l-pass').value;
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].email === email && customers[i].pass === pass) {
            currentUser = customers[i];
            closeModal('auth-modal');
            updateNavUser();
            alert('Welcome back, ' + currentUser.name + '!');
            return;
        }
    }
    alert('Invalid email or password!');
}

function doRegister() {
    var name = document.getElementById('r-name').value.trim();
    var email = document.getElementById('r-email').value.trim();
    var pass = document.getElementById('r-pass').value;
    var phone = document.getElementById('r-phone').value.trim();
    if (!name || !email || !pass) { alert('Fill all fields!'); return; }
    if (pass.length < 6) { alert('Password must be 6+ characters!'); return; }
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].email === email) { alert('Email already registered!'); return; }
    }
    var newUser = {id: nextId++, name: name, email: email, pass: pass, phone: phone, orders: 0, joined: new Date().toISOString().slice(0,10), status: 'Active'};
    customers.push(newUser);
    currentUser = newUser;
    closeModal('auth-modal');
    updateNavUser();
    alert('Account created! Welcome, ' + name + '!');
}

function doLogout() { currentUser = null; updateNavUser(); }

function updateNavUser() {
    var greet = document.getElementById('user-greet');
    var accBtn = document.getElementById('account-btn');
    var logBtn = document.getElementById('logout-btn');
    if (currentUser) {
        greet.textContent = '👤 ' + currentUser.name;
        greet.classList.remove('hidden');
        accBtn.classList.add('hidden');
        logBtn.classList.remove('hidden');
    } else {
        greet.classList.add('hidden');
        accBtn.classList.remove('hidden');
        logBtn.classList.add('hidden');
    }
}

// ========== MODALS ==========
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ========== NAV ==========
function toggleNav() { document.getElementById('nav-links').classList.toggle('open'); }
function closeNav() { document.getElementById('nav-links').classList.remove('open'); }

function showPage(page) {
    document.getElementById('page-shop').style.display = (page === 'shop') ? 'block' : 'none';
    document.getElementById('page-about').classList.toggle('hidden', page !== 'about');
}

// ========== SUBSCRIBE ==========
function doSubscribe() {
    var email = document.getElementById('sub-email').value.trim();
    if (!email || email.indexOf('@') === -1) { alert('Enter valid email!'); return; }
    subscribers.push({id: nextId++, email: email, joined: new Date().toISOString().slice(0,10)});
    document.getElementById('sub-email').value = '';
    alert('Subscribed!');
}

// ========== SCROLL ==========
function scrollToShop() {
    var section = document.getElementById('shop-section');
    if (section) section.scrollIntoView({behavior: 'smooth'});
}

// Close modal on outside click
var overlays = document.getElementsByClassName('modal-overlay');
for (var i = 0; i < overlays.length; i++) {
    overlays[i].addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });
}

// ========== INIT ==========
function init() {
    loadProducts();
    updateNavUser();
}

window.onload = init;