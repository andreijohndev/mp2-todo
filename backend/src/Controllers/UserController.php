<?php
require_once __DIR__ . "/../UserDataAccessLayer.php";
require_once __DIR__ . "/../config/DatabaseConnector.php";
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

class UserController {
    private $databaseConnector;
    private $dataAccessLayer;

    public function __construct() {
        $this->databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new UserDataAccessLayer($this->databaseConnector->conn);
    }

    public function LoginUser($json_data) {
        $data = json_decode($json_data);
        $user = $this->dataAccessLayer->GetUser($data->username);

        if (is_null($user)) {
            http_response_code(401);
            echo json_encode([
                "message" => "Incorrect username."
            ]);
            return;
        }

        if (password_verify($data->password, $user->password)) {
            $key = rtrim(file_get_contents("/run/secrets/secret-key"));
            $issuedAt = new DateTimeImmutable();
            $expire = $issuedAt->modify('+1 month')->getTimeStamp();

            $payload = [
                'iss' => 'mp2-todo', // Issuer
                'iat' => $issuedAt->getTimeStamp(), // Issued at
                'nbf' => $issuedAt->getTimeStamp(), // Not before
                'exp' => $expire, // Expiry date
                'username' => $user->username,
                'userId' => $user->id
            ];

            $jwt = JWT::encode($payload, $key, "HS256");
            http_response_code(200);
            echo json_encode([
                "token" => $jwt,
                "message" => "Successful login."
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "message" => "Incorrect password."
            ]);
        }
    }

    public function RegisterUser($json_data) {
        $data = json_decode($json_data);
        $user = new UserModel(0, $data->username, $data->password);

        if (!is_null($this->dataAccessLayer->GetUser($data->username))) {
            http_response_code(400);
            echo json_encode([
                "message" => "User already exists."
            ]);
            return;
        }

        if ($this->dataAccessLayer->AddUser($user)) {
            http_response_code(201);
            echo json_encode([
                "message" => "User was successfully registered."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while registering the user."
            ]);
        }
    }
}
?>