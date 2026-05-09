<?php
include 'db_connect.php';

$name = '';
$payment = '';
$grand = 0;
$items = '';

// Get data from GET or POST
$cust_name = isset($_REQUEST['cust_name']) ? $_REQUEST['cust_name'] : '';
$email = isset($_REQUEST['email']) ? $_REQUEST['email'] : '';
$phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : '';
$address = isset($_REQUEST['address']) ? $_REQUEST['address'] : '';
$payment = isset($_REQUEST['payment']) ? $_REQUEST['payment'] : '';
$items = isset($_REQUEST['items']) ? $_REQUEST['items'] : '';
$grand = isset($_REQUEST['grand_total']) ? floatval($_REQUEST['grand_total']) : 0;

// Save to database if data exists
if ($cust_name && $email) {
    $sql = "INSERT INTO orders (cust_name, email, phone, address, payment, items, grand_total, order_date, status) 
            VALUES ('$cust_name', '$email', '$phone', '$address', '$payment', '$items', '$grand', NOW(), 'Confirmed')";
    mysqli_query($conn, $sql);
    $name = $cust_name;
}
?>

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - LUXE MART</title>
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
            <a href="index.html" class="nav-btn">Home</a>
        </div>
    </nav>

    <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:60px;">✅</div>
        <h2 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;">Order Confirmed!</h2>
        <p style="color:var(--text2);">Thank you for shopping with LUXE MART!</p>
        
        <p><strong>Customer:</strong> <?php echo htmlspecialchars($cust_name); ?></p>
        <p><strong>Payment:</strong> <?php echo htmlspecialchars($payment); ?></p>
        <p><strong>Total:</strong> Rs <?php echo number_format($grand); ?></p>
        
        <br>
        <pre style="text-align:left;display:inline-block;background:var(--bg2);padding:15px;border-radius:12px;color:var(--text);"><?php echo htmlspecialchars($items); ?></pre>
        
        <br><br>
        <a href="index.html" class="btn btn-primary">🛍️ Continue Shopping</a>
    </div>
</body>
</html>