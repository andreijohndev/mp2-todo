<?php
require_once __DIR__ . "/Models/TaskListModel.php";

class ListDataAccessLayer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function AddList(TaskListModel $list) {
        $query = "INSERT INTO Lists (list_name, user_id) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $list->name, $list->ownerId);

        $result = $stmt->execute();
        return $result;
    }

    public function RenameList(int $id, string $newName) {
        $query = "UPDATE Lists SET list_name = ? WHERE list_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $newName, $id);

        $result = $stmt->execute();
        return $result;
    }

    public function DeleteList(int $id) {
        $query = "DELETE FROM Lists WHERE list_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);

        $result = $stmt->execute();
        return $result;
    }

    public function GetLists(int $userId) {
        $query = "SELECT * FROM Lists WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 0) {
            return null;
        }

        $lists = [];
        $stmt->bind_result($id, $list_name, $dbUserId);
        while ($stmt->fetch()) {
            $lists[] = new TaskListModel($id, $list_name, $dbUserId);
        }

        return $lists;
    }

    public function GetListById(int $id) {
        $query = "SELECT * FROM Lists WHERE list_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->store_result();

        $list = null;
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($dbId, $list_name, $dbUserId);
            $stmt->fetch();

            $list = new TaskListModel($dbId, $list_name, $dbUserId);
        }

        return $list;
    }

    public function GetListByName(string $name) {
        $query = "SELECT * FROM Lists WHERE list_name = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $stmt->store_result();

        $list = null;
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $list_name, $dbUserId);
            $stmt->fetch();

            $list = new TaskListModel($id, $list_name, $dbUserId);
        }

        return $list;
    }
}
?>