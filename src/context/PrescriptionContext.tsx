import React, { createContext, ReactNode, useContext, useState } from "react";

type Prescription = {
  id: string;
  title: string;
  time: string;
  recurrence: string;
  takeNow: boolean;
};

type PrescriptionContextType = {
  prescriptions: Prescription[];
  addPrescription: (data: Prescription) => void;
  removePrescription: (id: string) => void;
};

const PrescriptionContext = createContext<PrescriptionContextType>({
  prescriptions: [],
  addPrescription: () => {},
  removePrescription: () => {},
});

export function PrescriptionProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // ➕ Adicionar item
  function addPrescription(data: Prescription) {
    setPrescriptions((prev) => [...prev, data]);
  }

  // ❌ Remover item pelo id
  function removePrescription(id: string) {
    setPrescriptions((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <PrescriptionContext.Provider
      value={{ prescriptions, addPrescription, removePrescription }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}

// Hook para usar o contexto facilmente
export function usePrescriptions() {
  return useContext(PrescriptionContext);
}
