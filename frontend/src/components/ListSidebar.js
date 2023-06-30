import React from "react";
import { Button } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';

function renderListButtons(lists) {
  return lists.map(list => <Button variant="Secondary">list.name</Button>);
}

function ListSidebar(props) {
  return (
    <Stack gap={0}>
      <Button variant="primary">Create New List</Button>
      {renderListButtons(props.lists)}
    </Stack>
  );
}

export default ListSidebar;