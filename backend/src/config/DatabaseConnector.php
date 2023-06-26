<?php
class DatabaseConnector {
    private $host_name = "db";
    private $username = "root";
    private $password = "";
    private $db_name = "tododb";

    public $conn;

    public function __construct() {
        $this->password = rtrim(file_get_contents("/run/secrets/db-password"));
        $this->conn = mysqli_connect($this->host_name, $this->username, $this->password, $this->db_name) or die(mysqli_error());
    }
}
?>