"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export function DataProvider({ children, initialData }) {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/data", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      refreshData();
    }
  }, [initialData]);

  return (
    <DataContext.Provider value={{ data, loading, error, refreshData, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
