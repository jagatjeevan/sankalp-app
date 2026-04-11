export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completeBy?: Date;
  category: string;
  userId: string;
  isComplete: boolean;
}

export interface TodoCategory {
  id: string;
  name: string;
  color: string;
  userId: string;
}
