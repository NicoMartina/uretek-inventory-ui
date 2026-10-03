export interface Item {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  createdAt: string;
}

export interface Job {
  id: string;
  presupuestoNumber: string;
  jobDate: string;
  notes: string;
  createdAt: string;
}
