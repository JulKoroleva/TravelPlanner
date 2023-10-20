
export interface PlanItem {
  id: number;
  name: string;
  date: string;
  place: string;
  placeImage: string;
  description: string;
  budget: number;
  amount: number;
  isFavorite: boolean;
}

export interface Travel {
  id: number;
  name: string;
  place: string;
  placeImage: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  remainingBudget: number;
  plan: PlanItem[];
}