<?php
require_once dirname(__DIR__) . "/ItemDataAccessLayer.php";
require_once dirname(__DIR__) . "/config/DatabaseConnector.php";
require_once dirname(__DIR__) . "/Models/TaskItemModel.php";

class ItemController {
    private $databaseConnector;
    private $dataAccessLayer;
    private $ownerId;

    public function __construct($ownerId) {
        $this->ownerId = $ownerId;
        $this->databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new ItemDataAccessLayer($this->databaseConnector->conn);
    }

    public function CreateNewItem($task) {
        $item = new TaskItemModel(0, $task, $this->ownerId);

        if ($this->dataAccessLayer->AddItem($item)) {
            http_response_code(201);
            echo json_encode([
                "message" => "Item created."
            ]);
         }else {
            http_response_code(400);
            echo json_encode($item);
        }
    }

    public function GetItem($itemId) {
        $item = $this->dataAccessLayer->GetItem($itemId);

        if (is_null($item)) {
            http_response_code(400);
            echo json_encode([
                "message" => "Item not found."
            ]);
            return;
        }

        if ($item->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }

        http_response_code(200);
        echo json_encode($item);
    }

    public function GetItems() {
        $items = $this->dataAccessLayer->GetItems($this->ownerId);

        if (is_null($items)) {
            http_response_code(400);
            echo json_encode([
                "message" => "Items not found."
            ]);
            return;
        }

        if ($items[0]->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }

        http_response_code(200);
        echo json_encode($items);
    }

    public function ModifyItem($itemId, $newData) {
        $item = $this->dataAccessLayer->GetItem($itemId);

        if ($item->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }

        if ($this->dataAccessLayer->ModifyTask($item->id, $newData->task)) {
            http_response_code(200);
            echo json_encode([
                "message" => "Successfully modified item."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while modifying item."
            ]);
        }
    }

    public function DeleteItem($itemId) {
        $item = $this->dataAccessLayer->GetItem($itemId);

        if ($item->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }

        if ($this->dataAccessLayer->DeleteItem($itemId)) {
            http_response_code(204);
            echo json_encode([
                "message" => "Successfully deleted item."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while deleting item."
            ]);
        }
    }
}
?>