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
  const result: LogicApp[] = [];
  let url = `subscriptions/${subscriptionId}/providers/Microsoft.Logic/workflows?$top=100&api-version=2016-06-01`;
  while (true) {
    const logicApps = await get<ODataResponse<LogicApp>>(url);
    result.push(...logicApps.value);
    if (!logicApps.nextLink) {
      return result;
    }
    const index = logicApps.nextLink?.indexOf("subscriptions/") ?? 0;
    url = decodeURIComponent(logicApps.nextLink?.substring(index) ?? "");
  }
};

export const listLogicAppRuns = async (logicAppId: string) => {
  const result: LogicAppRun[] = [];
  let url = `${logicAppId}/runs?$top=100&api-version=2016-06-01`;
  console.log(url);
  while (true) {
    const logicAppRuns = await get<ODataResponse<LogicAppRun>>(url);
    result.push(...logicAppRuns.value);
    if (!logicAppRuns.nextLink) {
      return result;
    }
    const index = logicAppRuns.nextLink?.indexOf("subscriptions/") ?? 0;
    url = decodeURIComponent(logicAppRuns.nextLink?.substring(index) ?? "");
  }
};
