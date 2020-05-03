import { useState, useEffect } from "react";

export const getHash = () =>
  window.location.hash ? window.location.hash.substr(1).split("/") : [];

export const useHash = () => {
  const [value, setValue] = useState(getHash());

  useEffect(() => {
    const subscribe = () => setValue(getHash());
    window.addEventListener("hashchange", subscribe);
    return () => window.removeEventListener("hashchange", subscribe);
  }, []);

  return value;
};
