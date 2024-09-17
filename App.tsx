import { FontAwesome } from "@expo/vector-icons"; // Import des icônes
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import morseCode from "./morseCode"; // Import du fichier morseCode

// Fonction pour traduire le texte en code Morse
const textToMorse = (text: string): string => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char === " ") {
        return "   "; // Trois espaces pour séparer les mots
      }
      return morseCode[char] || ""; // Espaces simples entre les lettres
    })
    .join(" ");
};

// Fonction pour traduire le code Morse en texte
const morseToText = (morse: string): string => {
  const reversedMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );
  return morse
    .split("   ") // Trois espaces pour séparer les mots
    .map((word) =>
      word
        .split(" ")
        .map((symbol) => reversedMorseCode[symbol] || "")
        .join("")
    )
    .join(" ");
};

export default function App() {
  const [input, setInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [mode, setMode] = useState("textToMorse");

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

  const copyToClipboard = () => {
    if (translatedText) {
      Clipboard.setString(translatedText);
      Alert.alert("Succès", "Résultat copié dans le presse-papier");
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Logo et Nom de l'application */}
      <View style={styles.header}>
        <FontAwesome name="key" size={36} color="#4CAF50" style={styles.icon} />
        <Text style={styles.appName}>MorseTranslate</Text>
      </View>

      <Text style={styles.title}>
        Traduction{" "}
        {mode === "textToMorse" ? "Texte vers Morse" : "Morse vers Texte"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={
          mode === "textToMorse" ? "Entrez du texte" : "Entrez du code Morse"
        }
        value={input}
        onChangeText={setInput}
        placeholderTextColor="#A0A0A0"
      />

      <TouchableOpacity style={styles.button} onPress={handleTranslate}>
        <Text style={styles.buttonText}>Traduire</Text>
      </TouchableOpacity>

      {translatedText !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Résultat : {translatedText}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <FontAwesome name="copy" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.switchButton} onPress={toggleMode}>
        <Text style={styles.switchText}>
          {mode === "textToMorse"
            ? "Passer à Morse vers Texte"
            : "Passer à Texte vers Morse"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    width: "100%",
    backgroundColor: "#FFF",
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  result: {
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: "400",
    flex: 1,
  },
  copyButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#F1F3F5",
    borderRadius: 10,
  },
  switchButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#F1F3F5",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  switchText: {
    color: "#333",
    fontSize: 16,
  },
});
