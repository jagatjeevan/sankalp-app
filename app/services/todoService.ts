import { TodoItem } from "@models/todo";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const COLLECTION_NAME = "todos";

export class TodoService {
  static async getTodos(userId: string): Promise<TodoItem[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        completeBy: doc.data().completeBy?.toDate(),
      })) as TodoItem[];
    } catch (error) {
      console.error("Error getting todos:", error);
      throw error;
    }
  }

  static async addTodo(todo: Omit<TodoItem, "id">): Promise<string> {
    console.log("Adding todo:", todo);
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...todo,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  }

  static async updateTodo(
    id: string,
    updates: Partial<TodoItem>,
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  static async deleteTodo(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }

  static async toggleTodo(id: string, isComplete: boolean): Promise<void> {
    try {
      const updates: Partial<TodoItem> = {
        isComplete,
      };
      await this.updateTodo(id, updates);
    } catch (error) {
      console.error("Error toggling todo:", error);
      throw error;
    }
  }
}
