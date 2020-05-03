import React, { useState } from "react";
import { LogicApp } from "../../lib/api/Types";
import Details from "../logicapps/Details";
import {
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Collapse,
} from "@material-ui/core";
import { useStyles } from "../../lib/style";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

interface Props {
  resourceGroup: string;
  logicApps: LogicApp[];
  onSelect: (logicApp: LogicApp) => any;
}

const SelectLogicAppRg = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={props.resourceGroup} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          {props.logicApps.map((logicApp) => (
            <ListItem
              button
              key={logicApp.id}
              onClick={() => props.onSelect(logicApp)}
              className={classes.nested}
            >
              <ListItemText primary={logicApp.name} />
              <ListItemSecondaryAction>
                <Details logicApp={logicApp} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SelectLogicAppRg;
