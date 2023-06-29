<?php
require_once "../src/Controllers/UserController.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new DatabaseConnector();

// JSON POST data schema
// {
//     "username": "Username",
//     "password": "password"
// }
$postData = file_get_contents("php://input");

// Response data schema
// {
//     "message": "Output message"
// }
$userController = new UserController();
$userController->RegisterUser($postData);
?>