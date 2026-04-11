import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#3478f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#3478f6",
  },
  tabTextActive: {
    color: "#3478f6",
    fontWeight: "600",
  },
  form: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#3478f6",
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    color: "#fff",
  },
  noCategoriesText: {
    fontSize: 14,
    opacity: 0.6,
    paddingVertical: 8,
  },
  colorContainer: {
    marginBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorButtonSelected: {
    borderColor: "#000",
  },
  submitButton: {
    backgroundColor: "#3478f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  todoList: {
    flex: 1,
  },
  categoryList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  todoItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  categoryColorBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryItemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  todoMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoCategory: {
    fontSize: 12,
    borderColor: "#f0f0f0",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  todoDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
