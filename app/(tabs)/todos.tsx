import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { TODO_COLORS, TODO_SCREEN_TEXT } from "../config/todoConfig";
import { useAuth } from "../contexts/auth-context";
import { CategoryService } from "../services/categoryService";
import { TodoService } from "../services/todoService";
import { TodoCategory, TodoItem } from "../types/todo";
import { buildCategoryPayload, buildTodoPayload } from "../utils/todoUtils";
import { CategoryForm } from "./todos/components/CategoryForm";
import { CategoryList } from "./todos/components/CategoryList";
import { TabNavigation } from "./todos/components/TabNavigation";
import { TodoForm } from "./todos/components/TodoForm";
import { TodoList } from "./todos/components/TodoList";
import { styles } from "./todos/styles";

type Tab = "todos" | "categories";

export default function TodoScreen() {
  const { user } = useAuth();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const [activeTab, setActiveTab] = useState<Tab>("todos");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [completeBy, setCompleteBy] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(TODO_COLORS[0]);

  const loadCategories = useCallback(async () => {
    if (!user) return;

    try {
      const userCategories = await CategoryService.getCategories(user.uid);
      setCategories(userCategories);

      if (userCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(userCategories[0].name);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      Alert.alert(TODO_SCREEN_TEXT.errorLoadingCategories);
    }
  }, [user, selectedCategory]);

  const loadTodos = useCallback(async () => {
    if (!user) return;

    try {
      const userTodos = await TodoService.getTodos(user.uid);
      setTodos(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
      Alert.alert(TODO_SCREEN_TEXT.errorLoadingTodos);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    loadCategories();
    loadTodos();
  }, [user, loadCategories, loadTodos]);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert(TODO_SCREEN_TEXT.errorCategoryNameRequired);
      return;
    }

    if (!user) return;

    try {
      const newCategory = buildCategoryPayload(
        categoryName,
        selectedColor,
        user.uid,
      );

      await CategoryService.addCategory(newCategory);
      setCategoryName("");
      setSelectedColor(TODO_COLORS[0]);
      setShowAddForm(false);
      await loadCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      Alert.alert(TODO_SCREEN_TEXT.errorAddingCategory);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    Alert.alert(
      TODO_SCREEN_TEXT.deleteCategoryTitle,
      TODO_SCREEN_TEXT.deleteCategoryBody,
      [
        { text: TODO_SCREEN_TEXT.cancelButton, style: "cancel" },
        {
          text: TODO_SCREEN_TEXT.deleteButtonText,
          style: "destructive",
          onPress: async () => {
            try {
              await CategoryService.deleteCategory(categoryId);
              await loadCategories();
            } catch (error) {
              console.error("Error deleting category:", error);
              Alert.alert(TODO_SCREEN_TEXT.errorDeletingCategory);
            }
          },
        },
      ],
    );
  };

  const handleAddTodo = async () => {
    if (!title.trim()) {
      Alert.alert(TODO_SCREEN_TEXT.errorTitleRequired);
      return;
    }

    if (!selectedCategory) {
      Alert.alert(TODO_SCREEN_TEXT.errorCategoryRequired);
      return;
    }

    if (!user) return;

    try {
      const newTodo = buildTodoPayload(
        title,
        description,
        selectedCategory,
        user.uid,
        completeBy,
      );

      await TodoService.addTodo(newTodo);
      setTitle("");
      setDescription("");
      setCompleteBy("");
      setShowAddForm(false);
      await loadTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      Alert.alert(TODO_SCREEN_TEXT.errorAddingTodo);
    }
  };

  const handleToggleTodo = async (todoId: string, isComplete: boolean) => {
    try {
      await TodoService.toggleTodo(todoId, isComplete);
      await loadTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert(TODO_SCREEN_TEXT.errorTogglingTodo);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    Alert.alert(
      TODO_SCREEN_TEXT.deleteTodoTitle,
      TODO_SCREEN_TEXT.deleteTodoBody,
      [
        { text: TODO_SCREEN_TEXT.cancelButton, style: "cancel" },
        {
          text: TODO_SCREEN_TEXT.deleteButtonText,
          style: "destructive",
          onPress: async () => {
            try {
              await TodoService.deleteTodo(todoId);
              await loadTodos();
            } catch (error) {
              console.error("Error deleting todo:", error);
              Alert.alert(TODO_SCREEN_TEXT.errorDeletingTodo);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{TODO_SCREEN_TEXT.loadingText}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">
            {activeTab === "todos"
              ? TODO_SCREEN_TEXT.titleTodos
              : TODO_SCREEN_TEXT.titleCategories}
          </ThemedText>
          <Pressable
            style={styles.addButton}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <ThemedText style={styles.addButtonText}>
              {showAddForm
                ? TODO_SCREEN_TEXT.cancelButton
                : TODO_SCREEN_TEXT.addButton}
            </ThemedText>
          </Pressable>
        </ThemedView>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "todos" ? (
          <>
            {showAddForm && (
              <TodoForm
                title={title}
                description={description}
                completeBy={completeBy}
                selectedCategory={selectedCategory}
                categories={categories}
                textColor={textColor}
                backgroundColor={backgroundColor}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
                onCompleteByChange={setCompleteBy}
                onCategorySelect={setSelectedCategory}
                onSubmit={handleAddTodo}
              />
            )}
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          </>
        ) : (
          <>
            {showAddForm && (
              <CategoryForm
                categoryName={categoryName}
                selectedColor={selectedColor}
                textColor={textColor}
                backgroundColor={backgroundColor}
                onCategoryNameChange={setCategoryName}
                onColorSelect={setSelectedColor}
                onSubmit={handleAddCategory}
              />
            )}
            <CategoryList
              categories={categories}
              onDelete={handleDeleteCategory}
            />
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
