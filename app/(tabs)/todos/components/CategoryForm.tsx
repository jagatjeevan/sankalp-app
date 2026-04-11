import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TODO_COLORS, TODO_SCREEN_TEXT } from "@config/todoConfig";
import { Pressable, ScrollView, TextInput } from "react-native";
import { styles } from "../styles";

type CategoryFormProps = {
  categoryName: string;
  selectedColor: string;
  textColor: string;
  backgroundColor: string;
  onCategoryNameChange: (value: string) => void;
  onColorSelect: (color: string) => void;
  onSubmit: () => void;
};

export function CategoryForm({
  categoryName,
  selectedColor,
  textColor,
  backgroundColor,
  onCategoryNameChange,
  onColorSelect,
  onSubmit,
}: CategoryFormProps) {
  return (
    <ThemedView style={styles.form}>
      <TextInput
        style={[styles.input, { color: textColor, backgroundColor }]}
        placeholder={TODO_SCREEN_TEXT.categoryNamePlaceholder}
        placeholderTextColor={textColor}
        value={categoryName}
        onChangeText={onCategoryNameChange}
      />

      <ThemedText style={styles.label}>
        {TODO_SCREEN_TEXT.categoryColorLabel}
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.colorContainer}
      >
        {TODO_COLORS.map((color) => (
          <Pressable
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.colorButtonSelected,
            ]}
            onPress={() => onColorSelect(color)}
          />
        ))}
      </ScrollView>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <ThemedText style={styles.submitButtonText}>
          {TODO_SCREEN_TEXT.addCategoryButton}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
