<?php
class UserModel {
    public int $id;
    public string $username;
    public string $password;

    public function __construct($id, $username, $password) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
    }
}
?>