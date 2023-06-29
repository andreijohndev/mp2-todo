<?php
require_once "../src/Controllers/ItemController.php";
require "../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (!isset($_GET["list"])) {
    http_response_code(404);
    die();
}

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);

    if (sizeof($arr) == 2) {
        $jwt = $arr[1];
        
        try {
            $key = rtrim(file_get_contents("/run/secrets/secret-key"));
            $decoded = JWT::decode($jwt, new Key($key, "HS256"));
            $method = $_SERVER["REQUEST_METHOD"];
            $itemController = new ItemController($decoded->userId);

            try {
                if ($method === "POST") {
                    $inputData = file_get_contents("php://input");
                    $data = json_decode($inputData);

                    $itemController->CreateNewItem($_GET["list"], $data->task);
                } elseif ($method === "GET") {
                    if (isset($_GET["id"])) {
                        $itemController->GetItem($_GET["id"]);
                    } elseif (isset($_GET["category"])) {
                        $itemController->GetItemsInCategory($_GET["list"], $_GET["category"]);
                    } else {
                        $itemController->GetItems($_GET["list"]);
                    }
                } elseif ($method === "PATCH") {
                    if (isset($_GET["id"])) {
                        $inputData = file_get_contents("php://input");
                        $data = json_decode($inputData);

                        $itemController->ModifyItem($_GET["list"], $_GET["id"], $data);
                    }
                } elseif ($method === "DELETE") {
                    if (isset($_GET["id"])) {
                        $itemController->DeleteItem($_GET["list"], $_GET["id"]);
                    }
                }
            } catch (Exception $e) {
                http_response_code(400);
                echo json_encode([
                    "message" => $e->getMessage()
                ]);
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode([
                "message" => $e->getMessage()
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            "message" => "Invalid or missing token."
        ]);
    }
} else {
    http_response_code(401);
    echo json_encode([
        "message" => "Invalid or missing token."
    ]);
}
?>