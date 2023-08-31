import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  Clipboard,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

const QRCodeScannerScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  let [textTagHaveValue, setTextTagHaveValue] = useState("");

  const onSuccess = (event) => {
    Alert.alert("QR Code Data", event.data);
    let tagValue = event.data;
    setTextTagHaveValue(tagValue);
    Clipboard.setString(tagValue);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  if (isCameraOpen && hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (isCameraOpen && hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (isCameraOpen) {
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner onBarCodeScanned={onSuccess} style={{ flex: 1 }} />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={closeCamera}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textAlignVertical: "center",
              textAlign: "center",
              width: 300,
            }}
          >
            QRCode value will be copied automatically
          </Text>
          <Text
            style={{
              backgroundColor: "#06f",
              height: 50,
              width: 200,
              textAlign: "center",
              textAlignVertical: "center",
              borderRadius: 15,
              color: "white",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 42,
            }}
          >
            Close Camera
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            marginBottom: 150,
            height: 50,
          }}
        >
          QRCode Value is :
          <Text style={{ color: "#06f", fontWeight: "bold" }}>
            {textTagHaveValue}
          </Text>
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#023",
      }}
    >
      <TouchableOpacity onPress={openCamera}>
        <Text
          style={{
            backgroundColor: "#06f",
            height: 50,
            width: 200,
            textAlign: "center",
            textAlignVertical: "center",
            borderRadius: 15,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Open Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRCodeScannerScreen;
