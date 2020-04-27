import React, { useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { useHash } from "../../lib/hooks";
import { listSubscriptions } from "../../lib/api";
import useAsync, { AsyncState } from "react-hooks-useasync";

interface Props {
  onSelect: (id: string) => any;
  id: string | undefined;
}

const SelectSubscription = ({ onSelect, id }: Props) => {
  const hash = useHash();

  const [subscriptions, state, getSubscriptions] = useAsync(
    listSubscriptions,
    []
  );

  useEffect(() => {
    if (!hash) {
      return;
    }

    getSubscriptions();
  }, [hash, getSubscriptions]);

  useEffect(() => {
    if (subscriptions.length) {
      onSelect(subscriptions[0].subscriptionId);
    }
  }, [subscriptions, onSelect]);

  if (!hash || state === AsyncState.Idle || state === AsyncState.Pending) {
    return null;
  }

  return (
    <Select
      style={{ color: "white" }}
      value={id || subscriptions[0].subscriptionId}
      onChange={(name) => onSelect(name.target.value as string)}
    >
      {subscriptions.map((subscription) => (
        <MenuItem key={subscription.id} value={subscription.subscriptionId}>
          {subscription.displayName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectSubscription;
