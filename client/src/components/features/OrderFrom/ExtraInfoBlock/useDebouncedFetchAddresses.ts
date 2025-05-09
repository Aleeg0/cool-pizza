import {useEffect, useMemo, useState} from "react";
import AddressesApi from "@/store/apis/AddressesApi";
import debounce from "lodash.debounce";


export const useDebouncedFetchAddresses = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await AddressesApi.getAddresses(query);
        setSuggestions(response);
      } catch {
        setSuggestions([]);
      }
    }
    else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, 350),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  return {
    suggestions,
    trigger: debouncedFetchSuggestions
  };
};