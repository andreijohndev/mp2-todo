<?php
require_once __DIR__ . "/Models/TaskItemModel.php";

class ItemDataAccessLayer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function AddItem(TaskItemModel $item) {
        $query = "INSERT INTO Items (task, list_id, rank, category) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("siis", $item->task, $item->listId, $item->rank, $item->category);

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
            $stmt->bind_result($dbId, $task, $listId, $rank, $category);
            $stmt->fetch();

            $item = new TaskItemModel($dbId, $task, $listId, $rank, $category);
        }

        return $item;
    }

    public function GetItems($listId) {
        $query = "SELECT * FROM Items WHERE list_id = ? ORDER BY rank ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $listId);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 0) {
            return null;
        }

        $items = [];
        $stmt->bind_result($id, $task, $dbListId, $rank, $category);
        while ($stmt->fetch()) {
            $items[] = new TaskItemModel($id, $task, $dbListId, $rank, $category);
        }

        return $items;
    }

    public function GetItemsInCategory($listId, $category) {
        $query = "SELECT * FROM Items WHERE list_id = ? AND category = ? ORDER BY rank ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("is", $listId, $category);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 0) {
            return null;
        }

        $items = [];
        $stmt->bind_result($id, $task, $dbListId, $rank, $dbCategory);
        while ($stmt->fetch()) {
            $items[] = new TaskItemModel($id, $task, $dbListId, $rank, $dbCategory);
        }

        return $items;
    }

    public function ModifyRank(int $listId, int $id, string $category, int $newRank) {
        $rankUpdateQuery = "UPDATE Items SET `rank`=`rank`+1 WHERE list_id = ? AND category = ? AND `rank` >= ?";
        $rankStmt = $this->conn->prepare($rankUpdateQuery);

        $rankStmt->bind_param("isi", $listId, $category, $newRank);
        $rankUpdateResult = $rankStmt->execute();

        if (!$rankUpdateResult) {
            return $rankUpdateResult;
        }

        $query = "UPDATE Items SET rank = ? WHERE item_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $newRank, $id);

        $result = $stmt->execute();
        return $result;
    }

    public function ModifyTask(int $id, string $newTask) {
        $query = "UPDATE Items SET task = ? WHERE item_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $newTask, $id);

        $result = $stmt->execute();
        return $result;
    }

    public function ChangeCategory(int $listId, int $id, string $newCategory) {
        $newRank = $this->GetHighestRank($listId, $newCategory) + 1;
        $query = "UPDATE Items SET rank = ?, category = ? WHERE item_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("isi", $newRank, $newCategory, $id);

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

    public function GetHighestRank($listId, $category) {
        $query = "SELECT MAX(rank) FROM Items WHERE list_id = ? AND category = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("is", $listId, $category);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($maxRank);
            $stmt->fetch();

            return $maxRank;
        }
        
        return 0;
    }
}
?>