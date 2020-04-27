import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  DialogContent,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import useAsync, { AsyncState } from "react-hooks-useasync";
import { listTenants } from "../../lib/api";
import { getToken } from "../../lib/auth";
import { Cloud } from "@material-ui/icons";

const formatDomain = (domains: string[]) => {
  if (domains.length === 1) {
    return domains[0];
  }

  const candidates = domains.filter((v) => !v.endsWith("onmicrosoft.com"));

  return candidates.length
    ? candidates[candidates.length - 1]
    : domains[domains.length - 1];
};

const SelectTenant = () => {
  const [tenants, state, getTenants] = useAsync(listTenants, []);

  const [open, setOpen] = useState(!window.location.hash);

  useEffect(() => {
    if (open) {
      getTenants();
    }
  }, [getTenants, open]);

  const switchTenant = (id: string) => {
    getToken(id).then(() => {
      setOpen(false);
      window.location.hash = id;
    });
  };

  return (
    <>
      <IconButton edge="start" onClick={() => setOpen(true)}>
        <Cloud style={{ color: "white" }} />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Select tenant</DialogTitle>
        <DialogContent>
          {(state === AsyncState.Idle || state === AsyncState.Pending) && (
            <CircularProgress />
          )}
          {state === AsyncState.Done && tenants.length > 0 && (
            <List component="nav">
              {tenants.map((tenant) => (
                <ListItem
                  button
                  key={tenant.id}
                  onClick={() => switchTenant(tenant.tenantId)}
                >
                  <ListItemText>
                    {tenant.displayName} ({formatDomain(tenant.domains)})
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectTenant;
