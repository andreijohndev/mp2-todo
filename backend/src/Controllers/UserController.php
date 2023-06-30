<?php
require_once dirname(__DIR__) . "/UserDataAccessLayer.php";
require_once dirname(__DIR__) . "/config/DatabaseConnector.php";
require "../vendor/autoload.php";
use Sop\CryptoEncoding\PEM;
use Sop\JWX\JWE\EncryptionAlgorithm\A128CBCHS256Algorithm;
use Sop\JWX\JWE\KeyAlgorithm\RSAESPKCS1Algorithm;
use Sop\JWX\JWK\RSA\RSAPublicKeyJWK;
use Sop\JWX\JWT\Claim\Claim;
use Sop\JWX\JWT\Claim\ExpirationTimeClaim;
use Sop\JWX\JWT\Claim\IssuedAtClaim;
use Sop\JWX\JWT\Claim\NotBeforeClaim;
use Sop\JWX\JWT\Claims;
use Sop\JWX\JWT\JWT;

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
            $claims = new Claims(
                new Claim('userId', $user->id),
                IssuedAtClaim::now(),
                NotBeforeClaim::now(),
                ExpirationTimeClaim::fromString('now + 30 days'));
            $jwk = RSAPublicKeyJWK::fromPEM(PEM::fromFile(dirname(dirname(__DIR__)) . '/public_key.pem'));
            $key_algo = RSAESPKCS1Algorithm::fromPublicKey($jwk);
            $enc_algo = new A128CBCHS256Algorithm();
            $jwt = JWT::encryptedFromClaims($claims, $key_algo, $enc_algo);
            http_response_code(200);
            echo json_encode([
                "username" => $user->username,
                "token" => $jwt->token(),
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