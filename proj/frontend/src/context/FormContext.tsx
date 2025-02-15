import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchName: string;
  setSearchName: (name: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchName, setSearchName] = useState("");

  return (
    <FormContext.Provider value={{ activeTab, setActiveTab, searchName, setSearchName }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
