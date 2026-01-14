<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "inventory_db");

// Simple script to show we can still talk to the old DB
$result = $conn->query("SELECT * FROM products");
$data = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
?>