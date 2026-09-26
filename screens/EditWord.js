import { View, StyleSheet, TextInput, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

function EditWord({ navigation, route }) {
  const wordData = route.params?.wordData || {};

  const [phonetics, setPhonetics] = useState(wordData.phonetics || "");
  const [partOfSpeech, setPartOfSpeech] = useState(wordData.partOfSpeech || "");
  const [meaning, setMeaning] = useState(wordData.meaning || "");

  useEffect(() => {
    if (wordData.word) {
      navigation.setOptions({ title: `Editing word "${wordData.word}"` });
    } else {
      navigation.setOptions({ title: "Editing word" });
    }
  }, [wordData.word, navigation]);

  function onSave() {
    const updatedWordData = {
      ...wordData,
      phonetics,
      partOfSpeech,
      meaning,
    };

    navigation.navigate("AllWords", { wordData: updatedWordData });
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          marginTop: 40,
          marginBottom: 30,
          width: "20%",
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../assets/edit.png")}
      />

      <View style={{ flexDirection: "row", alignItems: "baseline", marginBottom: 12 }}>
        <Text style={styles.word}>{wordData.word}</Text>
        {wordData.audio && (
          <Pressable
            style={styles.playPressable}
            onPress={() => playSound(wordData.audio)}
          >
            <Ionicons
              name="volume-medium-outline"
              size={28}
              color={COLORS.primary900}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Phonetics:</Text>
        <TextInput
          style={styles.input}
          value={phonetics}
          onChangeText={setPhonetics}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Part of Speech:</Text>
        <TextInput
          style={styles.input}
          value={partOfSpeech}
          onChangeText={setPartOfSpeech}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Meaning:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={meaning}
          onChangeText={setMeaning}
          multiline
        />
      </View>

      <Pressable style={styles.buttonContainer} onPress={onSave}>
        <Text style={{ fontSize: 24, color: COLORS.white }}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  playPressable: {
    marginHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: COLORS.grey600,
    marginBottom: 4,
  },
  input: {
    height: 40,
    fontSize: 18,
    borderColor: COLORS.primary200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: COLORS.black,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.primary900,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditWord;