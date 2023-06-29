<?php
require_once "../src/Controllers/ListController.php";
require "../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);

    if (sizeof($arr) == 2) {
        $jwt = $arr[1];
        
        try {
            $key = rtrim(file_get_contents("/run/secrets/secret-key"));
            $decoded = JWT::decode($jwt, new Key($key, "HS256"));
            $method = $_SERVER["REQUEST_METHOD"];
            $listController = new ListController($decoded->userId);

            try {
                if ($method === "POST") {
                    // JSON POST data schema
                    // {
                    //     "name": "List name"
                    // }
                    $inputData = file_get_contents("php://input");
                    $data = json_decode($inputData);

                    $listController->CreateNewList($data->name);
                } elseif ($method === "PATCH") {
                    if (isset($_GET["id"])) {
                        // JSON POST data schema
                        // {
                        //     "name": "New name"
                        // }
                        $inputData = file_get_contents("php://input");
                        $data = json_decode($inputData);

                        $listController->RenameList($_GET["id"], $data->name);
                    }
                } elseif ($method === "GET") {
                    if (isset($_GET["id"])) {
                        $listController->GetListById($_GET["id"]);
                    } else {
                        $listController->GetLists();
                    }
                } elseif ($method === "DELETE") {
                    if (isset($_GET["id"])) {
                        $listController->DeleteList($_GET["id"]);
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