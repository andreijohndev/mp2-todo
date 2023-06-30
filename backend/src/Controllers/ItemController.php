<?php
require_once dirname(__DIR__) . "/ListDataAccessLayer.php";
require_once dirname(__DIR__) . "/ItemDataAccessLayer.php";
require_once dirname(__DIR__) . "/config/DatabaseConnector.php";
require_once dirname(__DIR__) . "/Models/TaskItemModel.php";

class ItemController {
    private $databaseConnector;
    private $dataAccessLayer;
    private $listDataAccessLayer;
    private $ownerId;

    public function __construct($ownerId) {
        $this->ownerId = $ownerId;
        $this->databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new ItemDataAccessLayer($this->databaseConnector->conn);
        $this->listDataAccessLayer = new ListDataAccessLayer($this->databaseConnector->conn);
    }

    public function CreateNewItem($listId, $task) {
        $this->AuthenticationCheck($listId);
        $item = new TaskItemModel(0, $task, $listId);

        if ($this->dataAccessLayer->AddItem($item)) {
            http_response_code(201);
            echo json_encode([
                "message" => "Item created."
            ]);
         }else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while creating item."
            ]);
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

        $this->AuthenticationCheck($item->listId);

        http_response_code(200);
        echo json_encode($item);
    }

    public function GetItems($listId) {
        $this->AuthenticationCheck($listId);
        $items = $this->dataAccessLayer->GetItems($listId);

        if (is_null($items)) {
            http_response_code(400);
            echo json_encode([
                "message" => "Items not found."
            ]);
            return;
        }

        http_response_code(200);
        echo json_encode($items);
    }

    public function ModifyItem($listId, $itemId, $newData) {
        $this->AuthenticationCheck($listId);
        $item = $this->dataAccessLayer->GetItem($itemId);

        if (property_exists($newData, "task") && !property_exists($newData, "completion")) {
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
        } elseif (property_exists($newData, "completion") && !property_exists($newData, "task")) {
            if ($this->dataAccessLayer->ModifyCompletion($item->listId, $item->id, $newData->category)) {
                http_response_code(200);
                echo json_encode([
                    "message" => "Successfully modified item completion."
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    "message" => "Unexpected error while modifying item completion."
                ]);
            }
        }
    }

    public function DeleteItem($listId, $itemId) {
        $this->AuthenticationCheck($listId);

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

    private function AuthenticationCheck($listId) {
        if ($this->listDataAccessLayer->GetListById($listId)->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }
    }
}
?>