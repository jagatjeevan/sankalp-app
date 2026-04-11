import { TodoCategory, TodoItem } from "@types/todo";

export function parseCompleteByInput(value: string): Date | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function formatTodoDueDate(date?: Date): string {
  return date?.toLocaleDateString() ?? "";
}

export function buildTodoPayload(
  title: string,
  description: string,
  category: string,
  userId: string,
  completeByValue: string,
): Omit<TodoItem, "id"> {
  return {
    title: title.trim(),
    description: description.trim() || undefined,
    category,
    userId,
    isComplete: false,
    completeBy: parseCompleteByInput(completeByValue),
  };
}

export function buildCategoryPayload(
  name: string,
  color: string,
  userId: string,
): Omit<TodoCategory, "id"> {
  return {
    name: name.trim(),
    color,
    userId,
  };
}
