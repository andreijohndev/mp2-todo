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
        $this->conn->close();
        return $result;
    }

    public function GetUser(string $username) {
        $query = "SELECT id, username, password FROM Users WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        $user = null;
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $db_username, $db_password);
            $stmt->fetch();

            $user = new UserModel();
            $user->id = $id;
            $user->username = $db_username;
            $user->password = $db_password;
        }

        $this->conn->close();
        return $user;
    }
}
?>