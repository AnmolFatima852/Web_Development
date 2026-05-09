<?php
session_start();
include 'db_connect.php';

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $pass = $_POST['password'];
    
    $sql = "SELECT * FROM customers WHERE email='$email' AND pass='$pass'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        header("Location: index.html");
        exit();
    } else {
        $error = "Invalid email or password!";
    }
}
?>

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - LUXE MART</title>
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
            <a href="register.php" class="nav-btn">Register</a>
        </div>
    </nav>

    <div style="display:flex;justify-content:center;align-items:center;min-height:80vh;padding:20px;">
        <div class="modal-box" style="position:static;animation:none;max-width:420px;">
            <span class="modal-icon">👋</span>
            <div class="modal-title">Welcome Back</div>
            <div class="modal-sub">Login to your LUXE MART account</div>
            
            <?php if ($error) echo '<p style="color:var(--red);text-align:center;margin-bottom:15px">' . $error . '</p>'; ?>
            
            <form method="POST" action="">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="form-input" required>
                </div>
                <div class="form-group">
                    <input type="submit" value="Login" class="btn btn-primary btn-full" style="width:100%">
                </div>
            </form>
            <div class="auth-switch">Don't have an account? <a href="register.php">Register</a></div>
        </div>
    </div>
</body>
</html>