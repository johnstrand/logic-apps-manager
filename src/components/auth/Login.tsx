import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import { getToken } from "../../lib/auth";

const Login = () => {
  const doLogin = () => {
    getToken().then((_) => {
      window.location.reload();
    });
  };
  return (
    <Dialog open>
      <DialogTitle>Log in required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Click the button below to sign in with your Azure AD account
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={doLogin}>
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
