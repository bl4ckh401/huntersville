import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

interface AdminContextValue {
  refreshKey: number;
  refresh: () => void;
  isRefreshing: boolean;
  setRefreshing: (value: boolean) => void;
}

export const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((value) => value + 1);
  }, []);

  const value = useMemo(
    () => ({
      refreshKey,
      refresh,
      isRefreshing,
      setRefreshing,
    }),
    [refreshKey, refresh, isRefreshing],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}
