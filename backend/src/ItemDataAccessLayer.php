<?php
require_once __DIR__ . "/Models/TaskItemModel.php";

class ItemDataAccessLayer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function AddItem(TaskItemModel $item) {
        $query = "INSERT INTO Items (task, user_id) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $item->task, $item->ownerId);

        $result = $stmt->execute();
        return $result;
    }

    public function GetItem($id) {
        $query = "SELECT * FROM Items WHERE item_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->store_result();

        $item = null;
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($dbId, $task, $userId);
            $stmt->fetch();

            $item = new TaskItemModel($dbId, $task, $userId);
        }

        return $item;
    }

    public function GetItems($userId) {
        $query = "SELECT * FROM Items WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 0) {
            return null;
        }

        $items = [];
        $stmt->bind_result($id, $task, $dbUserId);
        while ($stmt->fetch()) {
            $items[] = new TaskItemModel($id, $task, $dbUserId);
        }

        return $items;
    }

    public function ModifyTask(int $id, string $newTask) {
        $query = "UPDATE Items SET task = ? WHERE item_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $newTask, $id);

        $result = $stmt->execute();
        return $result;
    }

    public function DeleteItem(int $id) {
        $query = "DELETE FROM Items WHERE item_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);

        $result = $stmt->execute();
        return $result;
    }
}
?>