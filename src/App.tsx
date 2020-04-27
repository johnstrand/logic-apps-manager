import React, { useState } from "react";
import { Container, AppBar, Toolbar, Drawer, Divider } from "@material-ui/core";
import SelectTenant from "./components/auth/SelectTenant";
import { getAccount } from "./lib/auth";
import Login from "./components/auth/Login";
import { useHash } from "./lib/hooks";
import SelectSubscription from "./components/menu/SelectSubscription";

function App() {
  const account = getAccount();
  const hasTenant = useHash();
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>();

  if (!account) {
    return (
      <Container>
        <Login />
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <SelectTenant />
          <SelectSubscription
            onSelect={setSubscriptionId}
            id={subscriptionId}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        {hasTenant && (
          <div>
            <Drawer variant="temporary" anchor="left" open>
              <Divider />
              {subscriptionId}
            </Drawer>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
