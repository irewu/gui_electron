export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  purchaseDate: string;
  price: number;
  note: string;
  description?: string;
  maintenanceRecords?: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  type: string;
  date: string;
  notes: string;
} 