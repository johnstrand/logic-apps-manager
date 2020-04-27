import {
  Configuration,
  UserAgentApplication,
  AuthenticationParameters,
} from "msal";

const tenantId = () =>
  window.location.hash ? window.location.hash.substr(1) : "common";

const msalConfig: Configuration = {
  auth: {
    clientId: "57cb4a63-cbc2-48a9-8aa6-1dcabe45306c",
    authority: `https://login.microsoftonline.com/${tenantId()}`,
    validateAuthority: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export enum scopes {
  azure = "https://management.azure.com/user_impersonation",
}

const requiresInteraction = (errorMessage: string) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") !== -1 ||
    errorMessage.indexOf("interaction_required") !== -1 ||
    errorMessage.indexOf("login_required") !== -1
  );
};

const app = new UserAgentApplication(msalConfig);

export function getAccount() {
  return app.getAccount();
}

export async function getToken(id: string | null = null): Promise<string> {
  const request: AuthenticationParameters = {
    scopes: [scopes.azure],
    authority: `https://login.microsoftonline.com/${id ?? tenantId()}`,
  };
  if (!app.getAccount() && !app.getLoginInProgress()) {
    await app.loginPopup(request);
  }
  try {
    return (await app.acquireTokenSilent(request)).accessToken;
  } catch (error) {
    if (requiresInteraction(error) || error.errorCode === "consent_required") {
      return (await app.acquireTokenPopup(request)).accessToken;
    } else {
      alert("Non-interactive error: " + error.errorCode);
      return "";
    }
  }
}
