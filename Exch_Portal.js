// ========== DATA ==========
var users = {
    user1: { id: 'user1', name: 'Sarah Johnson', icon: '👩‍💼', rating: 4.8 },
    user2: { id: 'user2', name: 'Michael Chen', icon: '👨‍💼', rating: 4.9 }
};

var items = [
    { id: '1', name: 'Gold Necklace', brand: 'Tiffany & Co', category: 'jewellery', owner: 'user1', image: 'https://abwholesale.pk/cdn/shop/files/WhatsAppImage2024-09-12at1.05.22PM.jpg?v=1726128425&width=800', price: 450, description: 'Elegant 18k gold chain', condition: 'Like New', rating: 4.9, views: 342 },
    { id: '2', name: 'Diamond Ring', brand: 'Cartier', category: 'jewellery', owner: 'user1', image: 'https://www.brilliance.com/cdn-cgi/image/f=webp,width=1440,height=1440,quality=90/sites/default/files/vue/collections/engagement-rings-diamond_og.jpg', price: 1200, description: 'Brilliant cut solitaire', condition: 'New', rating: 5.0, views: 567 },
    { id: '3', name: 'Leather Jacket', brand: 'Hugo Boss', category: 'men-clothes', owner: 'user1', image: 'https://img.freepik.com/premium-photo/fashion-female-portrait-trendy-beautiful-woman-with-cute-face-stylish-streetwear-with-fashionable-rock-leather-jacket-jeans-bag-sits-street-near-cafe-sunset_338491-17918.jpg', price: 320, description: 'Premium Italian leather', condition: 'Good', rating: 4.6, views: 289 },
    { id: '4', name: 'Designer Jeans', brand: 'Diesel', category: 'men-clothes', owner: 'user1', image: 'https://img.kwcdn.com/product/fancy/07155a9f-c24c-458f-a42b-ed0a5493ba6a.jpg?imageView2/2/w/500/q/60/format/webp', price: 180, description: 'Slim fit denim', condition: 'Like New', rating: 4.4, views: 195 },
    { id: '5', name: 'Chanel No.5', brand: 'Chanel', category: 'perfumes', owner: 'user1', image: 'https://shahalami.pk/cdn/shop/products/3145891255300_df0c12c7-3235-4706-8aa6-2cb4969ae71e_510x@2x.progressive.jpg?v=1667378890', price: 150, description: 'Classic floral scent', condition: 'Like New', rating: 4.8, views: 421 },
    { id: '6', name: 'Tom Ford Noir', brand: 'Tom Ford', category: 'perfumes', owner: 'user1', image: 'https://www.myperfumeshop.com/cdn/shop/articles/everything-you-need-to-know-about-tom-ford-noir-edp-200426.jpg?v=1725092255&width=2048', price: 180, description: 'Sophisticated cologne', condition: 'New', rating: 4.7, views: 378 },
    { id: '7', name: 'Silver Bracelet', brand: 'Pandora', category: 'jewellery', owner: 'user2', image: 'https://www.dressyzone.com/cdn/shop/files/p16481-pair-of-adjustable-bracelet_ca4d1daa-0711-44ce-8f76-63e834b7c021_1200x1200.jpg?v=1747219507', price: 280, description: 'Sterling silver bracelet', condition: 'Good', rating: 4.5, views: 256 },
    { id: '8', name: 'Pearl Earrings', brand: 'Mikimoto', category: 'jewellery', owner: 'user2', image: 'https://www.enamoux.pk/cdn/shop/files/IMG_6697_b232f647-b1fc-42ad-9612-9c68995eb467.jpg?v=1764318645&width=1445', price: 520, description: 'Freshwater pearls', condition: 'New', rating: 5.0, views: 489 },
    { id: '9', name: 'Silk Dress', brand: 'Versace', category: 'women-clothes', owner: 'user2', image: 'https://shopatvelour.com/cdn/shop/files/0A6A1653.jpg?v=1738237304', price: 380, description: 'Flowing maxi dress', condition: 'Like New', rating: 4.9, views: 412 },
    { id: '10', name: 'Designer Blouse', brand: 'Gucci', category: 'women-clothes', owner: 'user2', image: 'https://athenapparels.com/cdn/shop/files/Maroon_Saree_With_Sequence_work_Blouse_Price_In_Pakistan_3_1024x1024.jpg?v=1740410495', price: 220, description: 'Luxury silk fabric', condition: 'Good', rating: 4.3, views: 298 },
    { id: '11', name: "Dior J'adore", brand: 'Dior', category: 'perfumes', owner: 'user2', image: 'https://m.media-amazon.com/images/I/61BHNNab11L._AC_UF350,350_QL80_.jpg', price: 165, description: 'Feminine fragrance', condition: 'Like New', rating: 4.8, views: 445 },
    { id: '12', name: 'Gucci Bloom', brand: 'Gucci', category: 'perfumes', owner: 'user2', image: 'https://www.glowbazar.pk/cdn/shop/files/gucci-bloom-edp-for-her-floral_600x_c7bf318e-be14-47ae-a7bf-7db633d50391.jpg?v=1727772310&width=1445', price: 155, description: 'Rich floral notes', condition: 'New', rating: 4.6, views: 367 }
];

// ========== STATE VARIABLES ==========
var currentUser = 'user1';
var selectedCategory = 'all';
var user1Exchange = [];
var user2Exchange = [];

var categories = [
    { key: 'all', label: 'All Items' },
    { key: 'jewellery', label: 'Jewellery' },
    { key: 'men-clothes', label: "Men's Clothing" },
    { key: 'women-clothes', label: "Women's Clothing" },
    { key: 'perfumes', label: 'Perfumes' }
];

// ========== FORMAT PRICE ==========
function formatPrice(p) {
    return '$' + p.toLocaleString();
}

// ========== RENDER STATS ==========
function renderStats() {
    var total = items.length;
    var totalVal = 0;
    var totalRating = 0;
    var totalViews = 0;

    for (var i = 0; i < items.length; i++) {
        totalVal = totalVal + items[i].price;
        totalRating = totalRating + items[i].rating;
        totalViews = totalViews + items[i].views;
    }

    var avg = (totalRating / items.length).toFixed(1);

    var html = '';
    html = html + '<div class="stat-box"><div class="big">' + total + '</div><div class="small">Total Items</div></div>';
    html = html + '<div class="stat-box"><div class="big">' + formatPrice(totalVal) + '</div><div class="small">Total Value</div></div>';
    html = html + '<div class="stat-box"><div class="big">' + avg + '</div><div class="small">Avg Rating</div></div>';
    html = html + '<div class="stat-box"><div class="big">' + totalViews.toLocaleString() + '</div><div class="small">Total Views</div></div>';

    document.getElementById('statsBar').innerHTML = html;
}

// ========== RENDER CATEGORIES ==========
function renderCategories() {
    var html = '';
    for (var i = 0; i < categories.length; i++) {
        var active = '';
        if (selectedCategory === categories[i].key) {
            active = ' active';
        }
        html = html + '<button class="cat-btn' + active + '" onclick="selectCategory(\'' + categories[i].key + '\')">' + categories[i].label + '</button>';
    }
    document.getElementById('categoryBar').innerHTML = html;
}

function selectCategory(cat) {
    selectedCategory = cat;
    renderAll();
}

// ========== GET FILTERED ITEMS ==========
function getFilteredItems() {
    var searchText = document.getElementById('searchInput').value.toLowerCase();
    var sortType = document.getElementById('sortSelect').value;
    var result = [];

    for (var i = 0; i < items.length; i++) {
        // Category filter
        if (selectedCategory !== 'all' && items[i].category !== selectedCategory) {
            continue;
        }
        // Search filter
        if (searchText !== '') {
            if (items[i].name.toLowerCase().indexOf(searchText) === -1 && items[i].brand.toLowerCase().indexOf(searchText) === -1) {
                continue;
            }
        }
        result.push(items[i]);
    }

    // Sort
    if (sortType === 'price-low') {
        result.sort(function(a, b) { return a.price - b.price; });
    } else if (sortType === 'price-high') {
        result.sort(function(a, b) { return b.price - a.price; });
    } else if (sortType === 'rating') {
        result.sort(function(a, b) { return b.rating - a.rating; });
    } else {
        result.sort(function(a, b) { return new Date(b.datePosted) - new Date(a.datePosted); });
    }

    return result;
}

// ========== CHECK IF SELECTED ==========
function isSelected(item) {
    var arr;
    if (item.owner === 'user1') {
        arr = user1Exchange;
    } else {
        arr = user2Exchange;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === item.id) {
            return true;
        }
    }
    return false;
}

// ========== TOGGLE SELECT ==========
function toggleSelect(item) {
    if (item.owner === 'user1') {
        var found = -1;
        for (var i = 0; i < user1Exchange.length; i++) {
            if (user1Exchange[i].id === item.id) {
                found = i;
                break;
            }
        }
        if (found !== -1) {
            // Remove
            var newArr = [];
            for (var i = 0; i < user1Exchange.length; i++) {
                if (i !== found) {
                    newArr.push(user1Exchange[i]);
                }
            }
            user1Exchange = newArr;
        } else {
            user1Exchange.push(item);
        }
    } else {
        var found = -1;
        for (var i = 0; i < user2Exchange.length; i++) {
            if (user2Exchange[i].id === item.id) {
                found = i;
                break;
            }
        }
        if (found !== -1) {
            var newArr = [];
            for (var i = 0; i < user2Exchange.length; i++) {
                if (i !== found) {
                    newArr.push(user2Exchange[i]);
                }
            }
            user2Exchange = newArr;
        } else {
            user2Exchange.push(item);
        }
    }
    renderAll();
}

// ========== CREATE ITEM CARD ==========
function createItemCard(item) {
    var selected = isSelected(item);
    var condClass = 'condition-' + item.condition.replace(' ', '-');
    var selectBtnText = '+ Select';
    var selectBtnClass = 'btn-select';

    if (selected) {
        selectBtnText = '✓ Selected';
        selectBtnClass = 'btn-select selected-btn';
    }

    var cardClass = 'item-card';
    if (selected) {
        cardClass = 'item-card selected';
    }

    // Create card HTML
    var html = '<div class="' + cardClass + '">';
    html = html + '<img src="' + item.image + '" alt="' + item.name + '" onerror="this.src=\'https://via.placeholder.com/200?text=No+Image\'">';
    html = html + '<div class="name">' + item.name + '</div>';
    html = html + '<div class="brand">' + item.brand + '</div>';
    html = html + '<div class="price">' + formatPrice(item.price) + '</div>';
    html = html + '<span class="condition ' + condClass + '">' + item.condition + '</span>';
    html = html + '<span> ⭐ ' + item.rating + '</span><br>';
    html = html + '<button class="btn-view" onclick="viewItem(\'' + item.id + '\')">View</button>';
    html = html + '<button class="' + selectBtnClass + '" onclick="selectItem(\'' + item.id + '\')">' + selectBtnText + '</button>';
    html = html + '</div>';

    return html;
}

// ========== SELECT ITEM BY ID ==========
function selectItem(id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            toggleSelect(items[i]);
            break;
        }
    }
}

// ========== VIEW ITEM ==========
function viewItem(id) {
    var item = null;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            item = items[i];
            break;
        }
    }
    if (item) {
        alert(
            'Name: ' + item.name + '\n' +
            'Brand: ' + item.brand + '\n' +
            'Price: ' + formatPrice(item.price) + '\n' +
            'Description: ' + item.description + '\n' +
            'Condition: ' + item.condition + '\n' +
            'Rating: ' + item.rating + ' ⭐\n' +
            'Location: ' + item.location + '\n' +
            'Views: ' + item.views
        );
    }
}

// ========== RENDER COLLECTIONS ==========
function renderCollections() {
    var filtered = getFilteredItems();
    var user1Items = [];
    var user2Items = [];

    for (var i = 0; i < filtered.length; i++) {
        if (filtered[i].owner === 'user1') {
            user1Items.push(filtered[i]);
        } else {
            user2Items.push(filtered[i]);
        }
    }

    // Titles
    document.getElementById('user1Title').innerHTML = users.user1.icon + ' ' + users.user1.name + "'s Items";
    document.getElementById('user2Title').innerHTML = users.user2.icon + ' ' + users.user2.name + "'s Items";

    // User 1 items
    var html1 = '';
    for (var i = 0; i < user1Items.length; i++) {
        html1 = html1 + createItemCard(user1Items[i]);
    }
    document.getElementById('user1Items').innerHTML = html1;

    // User 2 items
    var html2 = '';
    for (var i = 0; i < user2Items.length; i++) {
        html2 = html2 + createItemCard(user2Items[i]);
    }
    document.getElementById('user2Items').innerHTML = html2;
}

// ========== RENDER SUMMARY ==========
function renderSummary() {
    var total1 = 0;
    for (var i = 0; i < user1Exchange.length; i++) {
        total1 = total1 + user1Exchange[i].price;
    }

    var total2 = 0;
    for (var i = 0; i < user2Exchange.length; i++) {
        total2 = total2 + user2Exchange[i].price;
    }

    var bar = document.getElementById('summaryBar');
    var text = document.getElementById('summaryText');

    if (user1Exchange.length === 0 && user2Exchange.length === 0) {
        bar.style.display = 'none';
    } else {
        bar.style.display = 'flex';
        text.innerHTML = users.user1.name + ': ' + formatPrice(total1) + ' (' + user1Exchange.length + ' items) ↔ ' +
                         users.user2.name + ': ' + formatPrice(total2) + ' (' + user2Exchange.length + ' items)';
    }
}

// ========== DO EXCHANGE ==========
function doExchange() {
    if (user1Exchange.length === 0 && user2Exchange.length === 0) {
        alert('Please select items from both users first!');
        return;
    }

    var total1 = 0;
    var list1 = '';
    for (var i = 0; i < user1Exchange.length; i++) {
        total1 = total1 + user1Exchange[i].price;
        list1 = list1 + '- ' + user1Exchange[i].name + ' (' + formatPrice(user1Exchange[i].price) + ')\n';
    }

    var total2 = 0;
    var list2 = '';
    for (var i = 0; i < user2Exchange.length; i++) {
        total2 = total2 + user2Exchange[i].price;
        list2 = list2 + '- ' + user2Exchange[i].name + ' (' + formatPrice(user2Exchange[i].price) + ')\n';
    }

    var diff = Math.abs(total1 - total2);

    var msg = 'CONFIRM EXCHANGE?\n\n';
    msg = msg + users.user1.name + ' gives:\n' + (list1 || 'Nothing\n');
    msg = msg + 'Total: ' + formatPrice(total1) + '\n\n';
    msg = msg + users.user2.name + ' gives:\n' + (list2 || 'Nothing\n');
    msg = msg + 'Total: ' + formatPrice(total2) + '\n\n';
    msg = msg + 'Difference: ' + formatPrice(diff);

    if (confirm(msg)) {
        // Swap owners
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < user1Exchange.length; j++) {
                if (items[i].id === user1Exchange[j].id) {
                    items[i].owner = 'user2';
                }
            }
            for (var j = 0; j < user2Exchange.length; j++) {
                if (items[i].id === user2Exchange[j].id) {
                    items[i].owner = 'user1';
                }
            }
        }

        user1Exchange = [];
        user2Exchange = [];
        renderAll();
        alert('✅ Exchange completed successfully!');
    }
}

// ========== UPDATE USER DISPLAY ==========
function updateUI() {
    var user = users[currentUser];
    document.getElementById('userIcon').innerText = user.icon;
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userRating').innerText = user.rating;
}

// ========== SWITCH USER ==========
function switchUser() {
    if (currentUser === 'user1') {
        currentUser = 'user2';
    } else {
        currentUser = 'user1';
    }
    updateUI();
}

// ========== RENDER ALL ==========
function renderAll() {
    renderStats();
    renderCategories();
    renderCollections();
    renderSummary();
    updateUI();
}

// ========== START ==========
renderAll();