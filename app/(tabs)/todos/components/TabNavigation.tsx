import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TODO_SCREEN_TEXT } from "@config/todoConfig";
import { Pressable } from "react-native";
import { styles } from "../styles";

type Tab = "todos" | "categories";

type TabNavigationProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <ThemedView style={styles.tabContainer}>
      <Pressable
        style={[styles.tab, activeTab === "todos" && styles.tabActive]}
        onPress={() => setActiveTab("todos")}
      >
        <ThemedText style={activeTab === "todos" ? styles.tabTextActive : {}}>
          {TODO_SCREEN_TEXT.titleTodos}
        </ThemedText>
      </Pressable>
      <Pressable
        style={[styles.tab, activeTab === "categories" && styles.tabActive]}
        onPress={() => setActiveTab("categories")}
      >
        <ThemedText
          style={activeTab === "categories" ? styles.tabTextActive : {}}
        >
          {TODO_SCREEN_TEXT.titleCategories}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
