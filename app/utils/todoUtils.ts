import { TodoCategory, TodoItem } from "@models/todo";

export function parseCompleteByInput(value: string): Date | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const normalized = trimmed.replace(/[\u00A0\u202F]/g, " ").replace(/,/g, ",");
  const parsed = new Date(normalized);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  const dateTimeRegex =
    /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?\s*$/i;
  const match = normalized.match(dateTimeRegex);
  if (!match) return undefined;

  const [, day, month, year, hourPart, minutePart, secondPart = "0", ampm] =
    match;
  let hour = Number(hourPart);
  const minute = Number(minutePart);
  const second = Number(secondPart);

  if (ampm) {
    const lower = ampm.toLowerCase();
    if (lower === "pm" && hour < 12) {
      hour += 12;
    }
    if (lower === "am" && hour === 12) {
      hour = 0;
    }
  }

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    hour,
    minute,
    second,
  );

  return Number.isNaN(date.getTime()) ? undefined : date;
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
