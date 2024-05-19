import { QueryKey, useQueryClient } from "@tanstack/react-query";
import {
  useState,
  useRef,
  MutableRefObject,
  useLayoutEffect,
  useImperativeHandle,
} from "react";
import { Button, Modal, Text, StyleSheet, View } from "react-native";
import PopupController, { PopupRef } from "../utils/popupController";

const GlobalPopup = () => {
  const [visible, setVisible] = useState(false);
  const [failedQueries, setFailedQueries] = useState<QueryKey[]>([]);
  const queryClient = useQueryClient();
  const popupRef = useRef<PopupRef>();

  useLayoutEffect(() => {
    PopupController.setGlobalPopupRef(popupRef as MutableRefObject<PopupRef>);
  }, []);

  useImperativeHandle(
    popupRef,
    () => ({
      show: (failedQuery: QueryKey) => {
        setVisible(true);
        if (!failedQueries.includes(failedQuery)) {
          setFailedQueries([...failedQueries, failedQuery]);
        }
      },
      hide: () => {
        setVisible(false);
        if (failedQueries.length !== 0) {
          setFailedQueries([]);
        }
      },
    }),
    [failedQueries]
  );

  const handleTryAgain = () => {
    failedQueries.forEach(async (query) => {
      await queryClient.invalidateQueries({ queryKey: query });
    });
    PopupController.hideGlobalPopup();
  };

  return (
    <Modal visible={visible}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text>This is a global error popup</Text>
          <Button onPress={handleTryAgain} title="Try Again" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    borderColor: "black",
    borderWidth: 1,
    height: 80,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GlobalPopup;
