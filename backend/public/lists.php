<?php
require_once dirname(__DIR__) . "/src/Controllers/ListController.php";
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

            $listController = new ListController($userId);

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