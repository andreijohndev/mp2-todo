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
$userController = new UserController();
$result = $userController->RegisterUser($postData);

http_response_code($result["status"]);
echo json_encode($result);
/*$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query = "INSERT INTO Users (username, password) VALUES (?, ?)";

$stmt = $database->conn->prepare($query);
$stmt->bind_param("ss", $username, $hashed_password);

if ($stmt->execute()) {
    // TODO: Maybe add email verification?
    http_response_code(200);
    echo json_encode([
        "status" => 200,
        "message" => "User was successfully registered."
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        "status" => 400,
        "message" => "Unexpected error while registering the user."
    ]);
}*/
?>