"use client";

import React, { createContext, ReactNode, useContext, useState } from 'react';

// Simple interfaces for now
export interface Instance {
  id: string;
  state: string;
  name: string;
}

interface DevOpsContextType {
  ec2Instances: Instance[];
  setEc2Instances: (instances: Instance[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const DevOpsContext = createContext<DevOpsContextType | undefined>(undefined);

export const DevOpsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ec2Instances, setEc2Instances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <DevOpsContext.Provider
      value={{
        ec2Instances,
        setEc2Instances,
        loading,
        setLoading,
      }}
    >
      {children}
    </DevOpsContext.Provider>
  );
};

export const useDevOps = () => {
  const context = useContext(DevOpsContext);
  if (context === undefined) {
    throw new Error('useDevOps must be used within a DevOpsProvider');
  }
  return context;
};
