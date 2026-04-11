import { TodoCategory } from "@types/todo";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const COLLECTION_NAME = "categories";

export class CategoryService {
  static async getCategories(userId: string): Promise<TodoCategory[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TodoCategory[];
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  }

  static async addCategory(
    category: Omit<TodoCategory, "id"> & { createdAt?: Timestamp },
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...category,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  }

  static async updateCategory(
    id: string,
    updates: Partial<TodoCategory>,
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}
