import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TODO_SCREEN_TEXT } from "@config/todoConfig";
import { TodoItem } from "@models/todo";
import { Pressable, ScrollView } from "react-native";
import { styles } from "../styles";

type TodoListProps = {
  todos: TodoItem[];
  onToggle: (todoId: string, isComplete: boolean) => void;
  onDelete: (todoId: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ScrollView style={styles.todoList}>
      {todos.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText>{TODO_SCREEN_TEXT.noTodosMessage}</ThemedText>
        </ThemedView>
      ) : (
        todos.map((todo) => (
          <ThemedView key={todo.id} style={styles.todoItem}>
            <Pressable
              style={styles.todoContent}
              onPress={() => onToggle(todo.id, !todo.isComplete)}
            >
              <ThemedText
                style={[
                  styles.todoTitle,
                  todo.isComplete && styles.todoCompleted,
                ]}
              >
                {todo.title}
              </ThemedText>
              {todo.description && (
                <ThemedText
                  style={[
                    styles.todoDescription,
                    todo.isComplete && styles.todoCompleted,
                  ]}
                >
                  {todo.description}
                </ThemedText>
              )}
              <ThemedView style={styles.todoMeta}>
                <ThemedText style={styles.todoCategory}>
                  {todo.category}
                </ThemedText>
                {todo.completeBy && (
                  <ThemedText style={styles.todoDate}>
                    Due: {todo.completeBy.toLocaleDateString()}
                  </ThemedText>
                )}
              </ThemedView>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete(todo.id)}
            >
              <ThemedText style={styles.deleteButtonText}>
                {TODO_SCREEN_TEXT.deleteButtonText}
              </ThemedText>
            </Pressable>
          </ThemedView>
        ))
      )}
    </ScrollView>
  );
}
