<?php
session_start();
$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST['username'] === 'admin' && $_POST['password'] === 'admin123') {
        $_SESSION['admin_logged'] = true;
        header("Location: admin.php");
        exit();
    } else {
        $error = "Invalid credentials!";
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;">
        <div class="modal-box" style="position:static;animation:none;">
            <span class="modal-icon">🔐</span>
            <div class="modal-title">Admin Access</div>
            <?php if ($error) echo '<p style="color:var(--red);text-align:center;">' . $error . '</p>'; ?>
            <form method="POST">
                <div class="form-group"><label>Username</label><input type="text" name="username" class="form-input" value="admin"></div>
                <div class="form-group"><label>Password</label><input type="password" name="password" class="form-input" value="admin123"></div>
                <div class="form-group"><input type="submit" value="Sign In" class="btn btn-primary btn-full" style="width:100%"></div>
            </form>
        </div>
    </div>
</body>
</html>