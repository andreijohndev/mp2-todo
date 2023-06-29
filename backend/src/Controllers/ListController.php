<?php
require_once __DIR__ . "/../ListDataAccessLayer.php";
require_once __DIR__ . "/../config/DatabaseConnector.php";

class ListController {
    private $ownerId;
    private $databaseConnector;
    private $dataAccessLayer;

    public function __construct($ownerId) {
        $this->ownerId = $ownerId;
        $this->databaseConnector = new DatabaseConnector();
        $this->dataAccessLayer = new ListDataAccessLayer($this->databaseConnector->conn);
    }

    public function CreateNewList($listName) {
        $list = new TaskListModel(0, $listName, $this->ownerId);

        if ($this->dataAccessLayer->AddList($list)) {
            http_response_code(201);
            echo json_encode([
                "message" => "List created."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while creating list."
            ]);
        }
    }

    public function RenameList($listId, $newName) {
        $list = $this->dataAccessLayer->GetListById($listId);
        $this->AuthenticationCheck($list);

        if ($this->dataAccessLayer->RenameList($listId, $newName)) {
            http_response_code(200);
            echo json_encode([
                "message" => "Successfully renamed list."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while renaming list."
            ]);
        }
    }

    public function DeleteList($listId) {
        $list = $this->dataAccessLayer->GetListById($listId);
        $this->AuthenticationCheck($list);    

        if ($this->dataAccessLayer->DeleteList($listId)) {
            http_response_code(204);
            echo json_encode([
                "message" => "Successfully deleted list."
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Unexpected error while deleting list."
            ]);
        }
    }

    public function GetListById($listId) {
        $list = $this->dataAccessLayer->GetListById($listId);

        if (is_null($list)) {
            http_response_code(400);
            echo json_encode([
                "message" => "List not found."
            ]);
            return;
        }

        $this->AuthenticationCheck($list);

        http_response_code(200);
        echo json_encode($list);
    }

    public function GetLists() {
        $lists = $this->dataAccessLayer->GetLists($this->ownerId);

        if (is_null($lists)) {
            http_response_code(400);
            echo json_encode([
                "message" => "Lists not found."
            ]);
            return;
        }

        http_response_code(200);
        echo json_encode($lists);
    }

    private function AuthenticationCheck($list) {
        if ($list->ownerId != $this->ownerId) {
            http_response_code(401);
            echo json_encode([
                "message" => "Access denied."
            ]);
            die();
        }
    }
}
?>