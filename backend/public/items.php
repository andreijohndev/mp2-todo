<?php
require_once dirname(__DIR__) . "/src/Controllers/ItemController.php";
require "../vendor/autoload.php";
use Sop\CryptoEncoding\PEM;
use Sop\JWX\JWA\JWA;
use Sop\JWX\JWK\RSA\RSAPrivateKeyJWK;
use Sop\JWX\JWT\JWT;
use Sop\JWX\JWT\ValidationContext;

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
        $jwt = new JWT($arr[1]);
        
        try {
            $jwk = RSAPrivateKeyJWK::fromPEM(PEM::fromFile(dirname(__DIR__) . '/private_key.pem'));
            $ctx = ValidationContext::fromJWK($jwk)->withPermittedAlgorithmsAdded(JWA::ALGO_RSA1_5);
            $claims = $jwt->claims($ctx);
            $method = $_SERVER["REQUEST_METHOD"];
            $userId = -1;

            foreach ($claims as $claim) {
                if ($claim->name() == "userId") {
                    $userId = $claim->value();
                }
            }
            
            $itemController = new ItemController($userId);

            try {
                if ($method === "POST") {
                    $inputData = file_get_contents("php://input");
                    $data = json_decode($inputData);

                    $itemController->CreateNewItem($_GET["list"], $data->task);
                } elseif ($method === "GET") {
                    if (isset($_GET["id"])) {
                        $itemController->GetItem($_GET["id"]);
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