export interface ODataResponse<T> {
  value: T[];
  count: number;
  nextLink: string | null;
}

export interface Tenant {
  id: string;
  tenantId: string;
  countryCode: string;
  displayName: string;
  domains: string[];
  tenantCategory: string;
}

export interface Subscription {
  id: string;
  authorizationSource: string;
  managedByTenants: string[];
  subscriptionId: string;
  tenantId: string;
  displayName: string;
  state: string;
}

export interface LogicApp {
  properties: LogicAppProperties;
  id: string;
  name: string;
  type: string;
  location: string;
  tags: Tags;
}

export interface LogicAppProperties {
  provisioningState: string;
  createdTime: string;
  changedTime: string;
  state: string;
  version: string;
  accessEndpoint: string;
  integrationAccount: IntegrationAccount;
  definition: Definition;
  parameters: Tags;
}

export interface Definition {
  $schema: string;
  contentVersion: string;
  parameters: Tags;
  triggers: Tags;
  actions: Tags;
  outputs: Tags;
}

export type Tags = { [key: string]: any };

export interface IntegrationAccount {
  name: string;
  id: string;
  type: string;
}

export interface LogicAppRun {
  properties?: LogicAppRunProperties;
  id: string;
  name: string;
  type: string;
}

export interface LogicAppRunProperties {
  waitEndTime: Date;
  startTime: Date;
  endTime: Date;
  status: string;
  code: string;
  error: Error;
  correlation: Correlation;
  workflow: LogicAppRun;
  trigger: Trigger;
  outputs: {};
}

export interface Error {
  code: string;
  message: string;
}

export interface Correlation {
  clientTrackingId: string;
}

export interface Trigger {
  name: string;
  inputsLink: PutsLink;
  outputsLink: PutsLink;
  startTime: Date;
  endTime: Date;
  originHistoryName: string;
  correlation: Correlation;
  status: string;
}

export interface PutsLink {
  uri: string;
  contentVersion: string;
  contentSize: number;
  contentHash: ContentHash;
}

export interface ContentHash {
  algorithm: string;
  value: string;
}
