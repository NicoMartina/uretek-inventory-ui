export interface Item {
  id: string;
  name: string;
  category: string;
  unit: string;
  current_stock: number;
  minimum_stock: number;
  created_at: string;
}

export interface Job {
  id: string;
  presupuesto_number: string;
  job_date: string;
  notes: string;
  created_at: string;
}
