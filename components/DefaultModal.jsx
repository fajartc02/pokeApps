import { Modal, View } from "react-native";
import React from "react";
import { View as DefaultView } from "./Themed";

// props children is automaticaly load from parent when wrapped in ModalPopup
export default function DefaultModal({ visible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <DefaultView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </DefaultView>
    </Modal>
  );
}
