import { useState, useEffect } from "react";

const getHash = () =>
  window.location.hash ? window.location.hash.substr(1) : "";

export const useHash = () => {
  const [value, setValue] = useState(getHash());

  useEffect(() => {
    const subscribe = () => setValue(getHash());
    window.addEventListener("hashchange", subscribe);
    return () => window.removeEventListener("hashchange", subscribe);
  }, []);

  return value;
};
