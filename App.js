import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// Dictionnaire Morse
const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": "/",
};

// Convertir Morse en Texte
const morseToText = (morse) => {
  const reversedMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );
  return morse
    .split(" ")
    .map((symbol) => reversedMorseCode[symbol] || "")
    .join("");
};

// Convertir Texte en Morse
const textToMorse = (text) => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseCode[char] || "")
    .join(" ");
};

export default function App() {
  const [input, setInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [mode, setMode] = useState("textToMorse"); // Modes: 'textToMorse' ou 'morseToText'

  const handleTranslate = () => {
    if (mode === "textToMorse") {
      const result = textToMorse(input.trim());
      setTranslatedText(result);
    } else {
      const result = morseToText(input.trim());
      setTranslatedText(result);
    }
  };

  const toggleMode = () => {
    setMode(mode === "textToMorse" ? "morseToText" : "textToMorse");
    setInput("");
    setTranslatedText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Samuel AUDIC - MT4</Text>
      <Text style={styles.title}>
        Traduction{" "}
        {mode === "textToMorse" ? "Texte vers Morse" : "Morse vers Texte"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={
          mode === "textToMorse"
            ? "Entrez du texte"
            : "Entrez du code Morse (e.g. .... . .-.. .-.. ---)"
        }
        value={input}
        onChangeText={setInput}
      />

      <Button title="Traduire" onPress={handleTranslate} />
      {translatedText !== "" && (
        <Text style={styles.result}>Résultat : {translatedText}</Text>
      )}

      <Button
        title={
          mode === "textToMorse"
            ? "Passer à Morse vers Texte"
            : "Passer à Texte vers Morse"
        }
        onPress={toggleMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
});
