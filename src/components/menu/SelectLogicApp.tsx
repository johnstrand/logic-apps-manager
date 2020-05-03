import React, { useEffect } from "react";
import useAsync from "react-hooks-useasync";
import { listLogicApps } from "../../lib/api";
import { List } from "@material-ui/core";
import { LogicApp } from "../../lib/api/Types";
import { parseResourceId, groupBy } from "../../lib/utils";
import SelectLogicAppRg from "./SelectLogicAppRg";
import { useStyles } from "../../lib/style";

interface Props {
  subscriptionId: string;
  onSelect: (logicAppName: string) => any;
}

const SelectLogicApp = ({ onSelect, subscriptionId }: Props) => {
  const [list, , getLogicApps] = useAsync(listLogicApps, []);
  const classes = useStyles();

  useEffect(() => {
    getLogicApps(subscriptionId);
  }, [subscriptionId, getLogicApps]);

  const onSelectHandler = (logicApp: LogicApp) => {
    onSelect(logicApp.id);
  };

  const groupedList = groupBy(
    list,
    (item) => parseResourceId(item.id).resourceGroups
  );

  return (
    <List className={classes.logicAppList}>
      {Array.from(groupedList.keys()).map((resourceGroup) => (
        <SelectLogicAppRg
          key={resourceGroup}
          resourceGroup={resourceGroup}
          logicApps={groupedList.get(resourceGroup)!}
          onSelect={onSelectHandler}
        />
      ))}
    </List>
  );
};

export default SelectLogicApp;
