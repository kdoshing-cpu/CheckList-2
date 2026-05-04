export interface Task {
  id: string;
  title: string;
  description: string;
  links?: { label: string; url: string }[];
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  tasks: Task[];
}

export interface ChecklistState {
  [taskId: string]: boolean;
}

export interface Workshop {
  id: string;
  name: string;
  address: string;
  phone?: string;
  isCustom?: boolean;
}

export interface ProspectingEntry {
  id: string;
  workshopId: string;
  workshopName: string;
  date: string;
  whatTheyBuy: string;
  whereTheyBuy: string;
  monthlySpend: string;
  whatIsMissing: string;
  satisfaction: number; // 1-5
  notes: string;
}

export interface WorkshopDatabaseEntry {
  id: string;
  name: string;
  address: string;
  phone: string;
  products: string;
  monthlySpend: string;
  satisfaction: string;
}
