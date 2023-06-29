<?php
class TaskItemModel {
    public int $id;
    public string $task;
    public int $listId;
    public int $rank;
    public string $category;

    public function __construct($id, $task, $listId, $rank, $category) {
        $this->id = $id;
        $this->task = $task;
        $this->listId = $listId;
        $this->rank = $rank;
        $this->category = $category;
    }
}
?>