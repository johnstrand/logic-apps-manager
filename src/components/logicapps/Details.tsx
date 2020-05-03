import React, { useState } from "react";
import { LogicApp } from "../../lib/api/Types";
import { Info } from "@material-ui/icons";
import { IconButton, Dialog, DialogTitle } from "@material-ui/core";

interface Props {
  logicApp: LogicApp;
}

const Details = ({ logicApp }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton edge="end" onClick={() => setOpen(true)}>
        <Info color="primary" />
      </IconButton>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Details for {logicApp.name}</DialogTitle>
      </Dialog>
    </>
  );
};

export default Details;
