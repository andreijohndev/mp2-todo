<?php
class TaskItemModel {
    public int $id;
    public string $task;
    public int $ownerId;

    public function __construct($id, $task, $ownerId) {
        $this->id = $id;
        $this->task = $task;
        $this->ownerId = $ownerId;
    }
}
?>