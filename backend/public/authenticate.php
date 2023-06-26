<?php
require_once "../src/Controllers/UserController.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// JSON POST data schema
// {
//     "username": "Username",
//     "password": "password"
// }
$postData = file_get_contents("php://input");
$userController = new UserController();
$result = $userController->LoginUser($postData);

// Response data schema
// {
//     "status": 200,
//     "token": "jwt_token",
//     "message": "Output message"
// }
http_response_code($result["status"]);
echo json_encode($result);
?>