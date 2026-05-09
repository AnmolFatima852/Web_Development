<?php
include 'db_connect.php';

$sql = "SELECT * FROM products ORDER BY id ASC";
$result = mysqli_query($conn, $sql);

$products = array();

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'price' => floatval($row['price']),
        'sale' => floatval($row['sale']),
        'on_sale' => $row['sale'] > 0 && $row['sale'] < $row['price'],
        'stock' => intval($row['stock']),
        'category' => $row['category'],
        'img' => $row['image'],
        'desc' => $row['description']
    );
}

echo json_encode($products);
?>