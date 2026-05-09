<?php
$conn = mysqli_connect("localhost", "root", "", "luxe_mart_db", 3307);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>