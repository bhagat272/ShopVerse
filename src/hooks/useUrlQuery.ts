import { useCallback, useEffect, useState } from "react";
import { pushQueryUpdates } from "../utils/urlQuery";

export function useUrlQuery() {
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const handleLocationChange = () => {
      setSearch(window.location.search);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const updateParams = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      pushQueryUpdates(updates);
      setSearch(window.location.search);
    },
    []
  );

  return { params: new URLSearchParams(search), updateParams, search };
}
