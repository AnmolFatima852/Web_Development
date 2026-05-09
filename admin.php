<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['admin_logged'])) {
    header("Location: admin_login.php");
    exit();
}

// Handle Add Product - FIXED to insert into database
if (isset($_POST['add_product'])) {
    $name = mysqli_real_escape_string($conn, $_POST['prod_name']);
    $price = floatval($_POST['prod_price']);
    $sale = floatval($_POST['prod_sale']);
    $stock = intval($_POST['prod_stock']);
    $category = mysqli_real_escape_string($conn, $_POST['prod_category']);
    $image = mysqli_real_escape_string($conn, $_POST['prod_image']);
    $desc = mysqli_real_escape_string($conn, $_POST['prod_desc']);
    $on_sale = ($sale > 0 && $sale < $price) ? 1 : 0;
    
    $sql = "INSERT INTO products (name, price, sale, on_sale, stock, category, image, description) 
            VALUES ('$name', $price, $sale, $on_sale, $stock, '$category', '$image', '$desc')";
    
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Product added successfully!'); window.location='admin.php?tab=products';</script>";
        exit();
    } else {
        echo "<script>alert('Error: " . mysqli_error($conn) . "');</script>";
    }
}

// Handle Delete Order
if (isset($_GET['delete_order'])) {
    $id = $_GET['delete_order'];
    mysqli_query($conn, "DELETE FROM orders WHERE id=$id");
    header("Location: admin.php?tab=orders");
    exit();
}

// Handle Delete Customer
if (isset($_GET['delete_customer'])) {
    $id = $_GET['delete_customer'];
    mysqli_query($conn, "DELETE FROM customers WHERE id=$id");
    header("Location: admin.php?tab=customers");
    exit();
}

// Handle Delete Product - NEW
if (isset($_GET['delete_product'])) {
    $id = $_GET['delete_product'];
    mysqli_query($conn, "DELETE FROM products WHERE id=$id");
    header("Location: admin.php?tab=products");
    exit();
}

// Get counts from database
$custCount = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as total FROM customers"))['total'];
$orderCount = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as total FROM orders"))['total'];
$productCount = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as total FROM products"))['total'];
$revenue = mysqli_fetch_assoc(mysqli_query($conn, "SELECT SUM(grand_total) as total FROM orders"))['total'] ?? 0;

// Get all products from database
$productsResult = mysqli_query($conn, "SELECT * FROM products ORDER BY id DESC");

// Active tab
$tab = $_GET['tab'] ?? 'dashboard';
?>

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - LUXE MART</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<nav id="navbar">
    <a class="brand" href="index.html">
        <span class="brand-icon">🛍️</span>
        <span class="brand-l">LUXE</span><span class="brand-r"> MART</span>
    </a>
    <div class="nav-links">
        <a href="index.html" class="nav-btn">View Shop</a>
        <a href="admin_logout.php" class="nav-btn">Logout</a>
    </div>
</nav>

<div style="display:flex;min-height:calc(100vh - 66px);">
    
    <!-- Sidebar -->
    <div style="width:220px;background:var(--bg2);border-right:1px solid var(--border);padding:24px 0;">
        <div style="padding:0 22px 20px;border-bottom:1px solid var(--border);margin-bottom:14px;">
            <span style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--accent);">⚙️ Admin</span>
        </div>
        <a href="admin.php?tab=dashboard" style="display:flex;align-items:center;gap:10px;padding:12px 22px;color:<?php echo $tab=='dashboard'?'var(--accent)':'var(--text2)'; ?>;text-decoration:none;font-weight:600;border-left:3px solid <?php echo $tab=='dashboard'?'var(--accent)':'transparent'; ?>;">📊 Dashboard</a>
        <a href="admin.php?tab=products" style="display:flex;align-items:center;gap:10px;padding:12px 22px;color:<?php echo $tab=='products'?'var(--accent)':'var(--text2)'; ?>;text-decoration:none;font-weight:600;border-left:3px solid <?php echo $tab=='products'?'var(--accent)':'transparent'; ?>;">📦 Products</a>
        <a href="admin.php?tab=orders" style="display:flex;align-items:center;gap:10px;padding:12px 22px;color:<?php echo $tab=='orders'?'var(--accent)':'var(--text2)'; ?>;text-decoration:none;font-weight:600;border-left:3px solid <?php echo $tab=='orders'?'var(--accent)':'transparent'; ?>;">📋 Orders</a>
        <a href="admin.php?tab=customers" style="display:flex;align-items:center;gap:10px;padding:12px 22px;color:<?php echo $tab=='customers'?'var(--accent)':'var(--text2)'; ?>;text-decoration:none;font-weight:600;border-left:3px solid <?php echo $tab=='customers'?'var(--accent)':'transparent'; ?>;">👥 Customers</a>
    </div>
    
    <!-- Main Content -->
    <div style="flex:1;padding:30px;overflow-y:auto;">
        
        <?php if ($tab == 'dashboard'): ?>
        
            <h2 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin-bottom:24px;">📊 Dashboard</h2>
            
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:30px;">
                <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;">
                    <div style="font-size:26px;">📦</div>
                    <div style="font-size:11px;color:var(--text2);text-transform:uppercase;margin:6px 0;">Products</div>
                    <div style="font-size:28px;font-weight:800;"><?php echo $productCount; ?></div>
                </div>
                <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;">
                    <div style="font-size:26px;">👥</div>
                    <div style="font-size:11px;color:var(--text2);text-transform:uppercase;margin:6px 0;">Customers</div>
                    <div style="font-size:28px;font-weight:800;"><?php echo $custCount; ?></div>
                </div>
                <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;">
                    <div style="font-size:26px;">📋</div>
                    <div style="font-size:11px;color:var(--text2);text-transform:uppercase;margin:6px 0;">Orders</div>
                    <div style="font-size:28px;font-weight:800;"><?php echo $orderCount; ?></div>
                </div>
                <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;">
                    <div style="font-size:26px;">💰</div>
                    <div style="font-size:11px;color:var(--text2);text-transform:uppercase;margin:6px 0;">Revenue</div>
                    <div style="font-size:28px;font-weight:800;">Rs <?php echo number_format($revenue); ?></div>
                </div>
            </div>

        <?php elseif ($tab == 'products'): ?>
        
            <h2 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin-bottom:24px;">📦 Products (<?php echo $productCount; ?>)</h2>
            
            <!-- Add Product Button -->
            <button onclick="document.getElementById('add-product-form').style.display='block'" style="background:var(--accent);color:#000;padding:10px 20px;border:none;border-radius:10px;font-weight:700;cursor:pointer;margin-bottom:20px;">➕ Add New Product</button>
            
            <!-- Add Product Form - FIXED action -->
            <div id="add-product-form" style="display:none;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;">
                <h3 style="margin-bottom:18px;">➕ Add New Product</h3>
                <form method="POST" action="admin.php?tab=products">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
                        <div class="form-group">
                            <label>Product Name</label>
                            <input type="text" name="prod_name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="prod_category" class="form-input">
                                <option>Electronics</option><option>Footwear</option><option>Clothing</option>
                                <option>Accessories</option><option>Fitness</option><option>Home & Living</option><option>Beauty</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Regular Price (Rs)</label>
                            <input type="number" name="prod_price" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Sale Price (0 = no sale)</label>
                            <input type="number" name="prod_sale" class="form-input" value="0">
                        </div>
                        <div class="form-group">
                            <label>Stock</label>
                            <input type="number" name="prod_stock" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Image URL or Emoji</label>
                            <input type="text" name="prod_image" class="form-input" placeholder="https://... or 🎧">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="prod_desc" class="form-input" rows="3"></textarea>
                    </div>
                    <div style="display:flex;gap:10px;">
                        <input type="submit" name="add_product" value="Add Product" class="btn btn-primary" style="width:auto;padding:10px 30px;">
                        <button type="button" onclick="document.getElementById('add-product-form').style.display='none'" class="btn btn-secondary" style="width:auto;padding:10px 20px;">Cancel</button>
                    </div>
                </form>
            </div>
            
            <!-- Products List - FIXED to show database products -->
            <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:var(--bg2);">
                        <th style="padding:12px 18px;text-align:left;">ID</th>
                        <th style="padding:12px 18px;text-align:left;">Image</th>
                        <th style="padding:12px 18px;text-align:left;">Name</th>
                        <th style="padding:12px 18px;text-align:left;">Price</th>
                        <th style="padding:12px 18px;text-align:left;">Sale</th>
                        <th style="padding:12px 18px;text-align:left;">Stock</th>
                        <th style="padding:12px 18px;text-align:left;">Category</th>
                        <th style="padding:12px 18px;text-align:left;">Action</th>
                    </tr>
                    <?php
                    $productsQuery = mysqli_query($conn, "SELECT * FROM products ORDER BY id DESC");
                    if (mysqli_num_rows($productsQuery) > 0):
                        while($p = mysqli_fetch_assoc($productsQuery)):
                    ?>
                    <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:13px 18px;"><?php echo $p['id']; ?></td>
                        <td style="padding:13px 18px;"><?php echo $p['image'] ? '<img src="'.$p['image'].'" style="width:40px;height:40px;object-fit:cover;border-radius:8px;">' : '📦'; ?></td>
                        <td style="padding:13px 18px;font-weight:600;"><?php echo htmlspecialchars($p['name']); ?></td>
                        <td style="padding:13px 18px;">Rs <?php echo number_format($p['price']); ?></td>
                        <td style="padding:13px 18px;<?php echo $p['sale'] > 0 ? 'color:var(--accent);' : ''; ?>"><?php echo $p['sale'] > 0 ? 'Rs '.number_format($p['sale']) : '-'; ?></td>
                        <td style="padding:13px 18px;"><?php echo $p['stock']; ?></td>
                        <td style="padding:13px 18px;"><?php echo $p['category']; ?></td>
                        <td style="padding:13px 18px;">
                            <a href="admin.php?delete_product=<?php echo $p['id']; ?>&tab=products" onclick="return confirm('Delete <?php echo addslashes($p['name']); ?>?')" style="background:var(--red);color:#fff;padding:6px 14px;border-radius:8px;text-decoration:none;font-size:12px;">🗑️ Delete</a>
                        </td>
                    </tr>
                    <?php endwhile; else: ?>
                    <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text3);">No products found. Add your first product!</td></tr>
                    <?php endif; ?>
                </table>
            </div>

        <?php elseif ($tab == 'orders'): ?>
        
            <h2 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin-bottom:24px;">📋 Orders (<?php echo $orderCount; ?>)</h2>
            
            <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:var(--bg2);">
                        <th style="padding:12px 18px;text-align:left;">Order#</th>
                        <th style="padding:12px 18px;text-align:left;">Customer</th>
                        <th style="padding:12px 18px;text-align:left;">Email</th>
                        <th style="padding:12px 18px;text-align:left;">Payment</th>
                        <th style="padding:12px 18px;text-align:left;">Total</th>
                        <th style="padding:12px 18px;text-align:left;">Date</th>
                        <th style="padding:12px 18px;text-align:left;">Items</th>
                        <th style="padding:12px 18px;text-align:left;">Action</th>
                    </tr>
                    <?php
                    $ordersResult = mysqli_query($conn, "SELECT * FROM orders ORDER BY id DESC");
                    if (mysqli_num_rows($ordersResult) > 0):
                        while($o = mysqli_fetch_assoc($ordersResult)):
                    ?>
                    <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:13px 18px;"><strong>#<?php echo str_pad($o['id'], 5, '0', STR_PAD_LEFT); ?></strong></td>
                        <td style="padding:13px 18px;"><?php echo htmlspecialchars($o['cust_name']); ?></td>
                        <td style="padding:13px 18px;"><?php echo $o['email']; ?></td>
                        <td style="padding:13px 18px;"><?php echo $o['payment']; ?></td>
                        <td style="padding:13px 18px;color:var(--accent);font-weight:700;">Rs <?php echo number_format($o['grand_total']); ?></td>
                        <td style="padding:13px 18px;"><?php echo $o['order_date']; ?></td>
                        <td style="padding:13px 18px;font-size:12px;"><?php echo nl2br($o['items']); ?></td>
                        <td style="padding:13px 18px;">
                            <a href="admin.php?delete_order=<?php echo $o['id']; ?>&tab=orders" onclick="return confirm('Delete order #<?php echo $o['id']; ?>?')" style="background:var(--red);color:#fff;padding:6px 14px;border-radius:8px;text-decoration:none;font-size:12px;">🗑️ Delete</a>
                        </td>
                    </tr>
                    <?php endwhile; else: ?>
                    <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text3);">No orders yet</td></tr>
                    <?php endif; ?>
                </table>
            </div>

        <?php elseif ($tab == 'customers'): ?>
        
            <h2 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin-bottom:24px;">👥 Customers (<?php echo $custCount; ?>)</h2>
            
            <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:var(--bg2);">
                        <th style="padding:12px 18px;text-align:left;">ID</th>
                        <th style="padding:12px 18px;text-align:left;">Name</th>
                        <th style="padding:12px 18px;text-align:left;">Email</th>
                        <th style="padding:12px 18px;text-align:left;">Phone</th>
                        <th style="padding:12px 18px;text-align:left;">Joined</th>
                        <th style="padding:12px 18px;text-align:left;">Status</th>
                        <th style="padding:12px 18px;text-align:left;">Action</th>
                    </tr>
                    <?php
                    $customersResult = mysqli_query($conn, "SELECT * FROM customers ORDER BY id DESC");
                    if (mysqli_num_rows($customersResult) > 0):
                        while($c = mysqli_fetch_assoc($customersResult)):
                    ?>
                    <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:13px 18px;"><?php echo $c['id']; ?></td>
                        <td style="padding:13px 18px;font-weight:600;"><?php echo htmlspecialchars($c['name']); ?></td>
                        <td style="padding:13px 18px;"><?php echo $c['email']; ?></td>
                        <td style="padding:13px 18px;"><?php echo $c['phone']; ?></td>
                        <td style="padding:13px 18px;"><?php echo $c['joined']; ?></td>
                        <td style="padding:13px 18px;"><span style="background:rgba(34,201,122,0.15);color:#22c97a;padding:3px 10px;border-radius:20px;font-size:11px;"><?php echo $c['status']; ?></span></td>
                        <td style="padding:13px 18px;">
                            <a href="admin.php?delete_customer=<?php echo $c['id']; ?>&tab=customers" onclick="return confirm('Delete customer <?php echo addslashes($c['name']); ?>?')" style="background:var(--red);color:#fff;padding:6px 14px;border-radius:8px;text-decoration:none;font-size:12px;">🗑️ Delete</a>
                        </td>
                    </tr>
                    <?php endwhile; else: ?>
                    <tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text3);">No customers yet</td></tr>
                    <?php endif; ?>
                </table>
            </div>

        <?php endif; ?>
        
    </div>
</div>

</body>
</html>