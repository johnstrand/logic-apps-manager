import { getToken } from "../auth";
import {
  ODataResponse,
  Tenant,
  Subscription,
  LogicApp,
  LogicAppRun,
} from "./Types";

async function get<T>(url: string) {
  const endpoint = `https://management.azure.com/${url}`;
  const headers = await getHeaders();
  const result = await fetch(endpoint, {
    method: "GET",
    mode: "cors",
    headers,
  }).then<T>((res) => res.json());
  return result;
}

export async function getHeaders() {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export const listTenants = async () => {
  const tenants = await get<ODataResponse<Tenant>>(
    "tenants?api-version=2019-11-01"
  );
  return tenants.value;
};

export const listSubscriptions = async () => {
  const tenants = await get<ODataResponse<Subscription>>(
    "subscriptions?api-version=2019-11-01"
  );
  return tenants.value;
};

export const listLogicApps = async (subscriptionId: string) => {
  const logicApps = await get<ODataResponse<LogicApp>>(
    `subscriptions/${subscriptionId}/providers/Microsoft.Logic/workflows?$top=100&api-version=2016-06-01`
  );
  return logicApps.value;
};

// TODO: Handle skip token
export const listLogicAppRuns = async (logicAppId: string) => {
  const runs = await get<ODataResponse<LogicAppRun>>(
    `${logicAppId}/runs?api-version=2016-06-01`
  );
  return { runs: runs.value, next: runs.nextLink };
};
