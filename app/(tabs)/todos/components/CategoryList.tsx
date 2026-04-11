import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TODO_SCREEN_TEXT } from "@config/todoConfig";
import { TodoCategory } from "@models/todo";
import { Pressable, ScrollView } from "react-native";
import { styles } from "../styles";

type CategoryListProps = {
  categories: TodoCategory[];
  onDelete: (categoryId: string) => void;
};

export function CategoryList({ categories, onDelete }: CategoryListProps) {
  return (
    <ScrollView style={styles.categoryList}>
      {categories.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText>{TODO_SCREEN_TEXT.noCategoriesMessage}</ThemedText>
        </ThemedView>
      ) : (
        categories.map((category) => (
          <ThemedView key={category.id} style={styles.categoryItem}>
            <ThemedView
              style={[
                styles.categoryColorBadge,
                { backgroundColor: category.color },
              ]}
            />
            <ThemedView style={styles.categoryInfo}>
              <ThemedText style={styles.categoryItemName}>
                {category.name}
              </ThemedText>
            </ThemedView>
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete(category.id)}
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
