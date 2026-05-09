<?php
include 'db_connect.php';

$success = '';
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $phone = $_POST['phone'];
    
    $sql = "INSERT INTO customers (name, email, pass, phone, joined, status) 
            VALUES ('$name', '$email', '$pass', '$phone', CURDATE(), 'Active')";
    
    if (mysqli_query($conn, $sql)) {
        $success = "Registration successful! <a href='login.php'>Login here</a>";
    } else {
        $error = "Error: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - LUXE MART</title>
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
            <a href="login.php" class="nav-btn">Login</a>
        </div>
    </nav>

    <div style="display:flex;justify-content:center;align-items:center;min-height:80vh;padding:20px;">
        <div class="modal-box" style="position:static;animation:none;max-width:420px;">
            <span class="modal-icon">🛒</span>
            <div class="modal-title">Create Account</div>
            <div class="modal-sub">Join LUXE MART — it's free!</div>
            
            <?php if ($success) echo '<p style="color:var(--green);text-align:center;margin-bottom:15px">' . $success . '</p>'; ?>
            <?php if ($error) echo '<p style="color:var(--red);text-align:center;margin-bottom:15px">' . $error . '</p>'; ?>
            
            <form method="POST" action="">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="form-input" required minlength="6">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" class="form-input">
                </div>
                <div class="form-group">
                    <input type="submit" value="Register" class="btn btn-primary btn-full" style="width:100%">
                </div>
            </form>
            <div class="auth-switch">Already have an account? <a href="login.php">Login</a></div>
        </div>
    </div>
</body>
</html>