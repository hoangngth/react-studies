import React from "react";
import AddDialog from "./AddDialog";
import { useState } from "react";

const Header = ({ title, onAdd }) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      <button className="btn" onClick={handleOpenAddDialog}>
        Add Task
      </button>
      <AddDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onAdd={onAdd}
      />
    </header>
  );
};

export default Header;
