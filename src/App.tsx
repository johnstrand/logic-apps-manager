import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Grid,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import SelectTenant from "./components/auth/SelectTenant";
import { getAccount } from "./lib/auth";
import Login from "./components/auth/Login";
import SelectSubscription from "./components/menu/SelectSubscription";
import SelectLogicApp from "./components/menu/SelectLogicApp";
import Executions from "./components/logicapps/Executions";
import { useStyles } from "./lib/style";

function App() {
  const account = getAccount();
  const classes = useStyles();
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>();
  const [logicAppName, setLogicAppName] = useState<string | undefined>();

  if (!account) {
    return (
      <Container>
        <Login />
      </Container>
    );
  }

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <SelectTenant />
          <SelectSubscription
            onSelect={setSubscriptionId}
            id={subscriptionId}
          />
        </Toolbar>
      </AppBar>
      {subscriptionId && (
        <>
          <Drawer open variant="permanent" className={classes.drawerPaper}>
            <SelectLogicApp
              subscriptionId={subscriptionId}
              onSelect={setLogicAppName}
            />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Executions logicAppName={logicAppName} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
