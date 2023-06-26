<?php
require_once __DIR__ . "/../UserDataAccessLayer.php";
require_once __DIR__ . "/../config/DatabaseConnector.php";
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

class UserController {
    private $dataAccessLayer = null;

    public function LoginUser($json_data) {
        $databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new UserDataAccessLayer($databaseConnector->conn);
        $data = json_decode($json_data);
        $user = $this->dataAccessLayer->GetUser($data->username);

        if (is_null($user)) {
            return [
                "status" => 401,
                "message" => "Username is incorrect."
            ];
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
                'username' => $user->username
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');
            return [
                "status" => 200,
                "token" => $jwt,
                "message" => "Successful login."
            ];
        } else {
            return [
                "status" => 401,
                "message" => "Incorrect password."
            ];
        }
    }

    public function RegisterUser($json_data) {
        $databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new UserDataAccessLayer($databaseConnector->conn);
        $data = json_decode($json_data);
        $user = new UserModel();
        $user->username = $data->username;
        $user->password = $data->password;

        if ($this->dataAccessLayer->AddUser($user)) {
            return [
                "status" => 200,
                "message" => "User was successfully registered."
            ];
        } else {
            return [
                "status" => 400,
                "message" => "Unexpected error while registering the user."
            ];
        }
    }
}
?>