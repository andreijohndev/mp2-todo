<?php
class TaskItemModel {
    public int $id;
    public string $task;
    public int $listId;
    public bool $completed;

    public function __construct($id, $task, $listId, $completed) {
        $this->id = $id;
        $this->task = $task;
        $this->listId = $listId;
        $this->completed = $completed;
    }
}
?>