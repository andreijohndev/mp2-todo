<?php
require_once __DIR__ . "/Models/UserModel.php";

class UserDataAccessLayer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function AddUser(UserModel $user) {
        $query = "INSERT INTO Users (username, password) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $hashed_password = password_hash($user->password, PASSWORD_DEFAULT);
        $stmt->bind_param("ss", $user->username, $hashed_password);

        $result = $stmt->execute();
        return $result;
    }

    public function GetUser(string $username) {
        $query = "SELECT * FROM Users WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        $user = null;
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $dbUsername, $dbPassword);
            $stmt->fetch();

            $user = new UserModel($id, $dbUsername, $dbPassword);
        }

        return $user;
    }
}
?>