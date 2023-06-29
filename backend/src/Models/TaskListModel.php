<?php
class TaskListModel {
    public int $id;
    public string $name;
    public int $ownerId;

    public function __construct($id, $name, $ownerId) {
        $this->id = $id;
        $this->name = $name;
        $this->ownerId = $ownerId;
    }
}
?>