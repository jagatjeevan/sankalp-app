import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TODO_SCREEN_TEXT } from "@config/todoConfig";
import { TodoCategory } from "@models/todo";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, ScrollView, TextInput } from "react-native";
import { styles } from "../styles";

type TodoFormProps = {
  title: string;
  description: string;
  completeBy: string;
  selectedCategory: string;
  categories: TodoCategory[];
  textColor: string;
  backgroundColor: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCompleteByChange: (value: string) => void;
  onCategorySelect: (category: string) => void;
  onSubmit: () => void;
};

export function TodoForm({
  title,
  description,
  completeBy,
  selectedCategory,
  categories,
  textColor,
  backgroundColor,
  onTitleChange,
  onDescriptionChange,
  onCompleteByChange,
  onCategorySelect,
  onSubmit,
}: TodoFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time" | "datetime">(
    Platform.OS === "ios" ? "datetime" : "date",
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event;

    if (type === "dismissed") {
      setShowDatePicker(false);
      if (Platform.OS === "android") {
        setPickerMode("date");
      }
      return;
    }

    if (!date) {
      return;
    }

    if (Platform.OS === "android" && pickerMode === "date") {
      setSelectedDate(date);
      setPickerMode("time");
      setShowDatePicker(true);
      return;
    }

    const finalDate = date;
    setSelectedDate(finalDate);
    setShowDatePicker(false);
    if (Platform.OS === "android") {
      setPickerMode("date");
    }
    onCompleteByChange(finalDate.toLocaleString());
  };

  return (
    <ThemedView style={styles.form}>
      <TextInput
        style={[styles.input, { color: textColor, backgroundColor }]}
        placeholder={TODO_SCREEN_TEXT.todoTitlePlaceholder}
        placeholderTextColor={textColor}
        value={title}
        onChangeText={onTitleChange}
      />

      <TextInput
        style={[styles.input, { color: textColor, backgroundColor }]}
        placeholder={TODO_SCREEN_TEXT.todoDescriptionPlaceholder}
        placeholderTextColor={textColor}
        value={description}
        onChangeText={onDescriptionChange}
        multiline
      />

      <TextInput
        style={[styles.input, { color: textColor, backgroundColor }]}
        placeholder={TODO_SCREEN_TEXT.todoCompleteByPlaceholder}
        placeholderTextColor={textColor}
        value={completeBy}
        onPressIn={() => {
          if (Platform.OS === "android") {
            setPickerMode("date");
          }
          setShowDatePicker(true);
        }}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode={pickerMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      <ThemedText style={styles.label}>
        {TODO_SCREEN_TEXT.todoCategoryLabel}
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryButton,
                selectedCategory === cat.name && styles.categoryButtonSelected,
              ]}
              onPress={() => onCategorySelect(cat.name)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === cat.name && styles.categoryTextSelected,
                ]}
              >
                {cat.name}
              </ThemedText>
            </Pressable>
          ))
        ) : (
          <ThemedText style={styles.noCategoriesText}>
            {TODO_SCREEN_TEXT.noCategoriesMessage}
          </ThemedText>
        )}
      </ScrollView>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <ThemedText style={styles.submitButtonText}>
          {TODO_SCREEN_TEXT.addTodoButton}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
