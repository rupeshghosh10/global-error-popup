import { QueryKey } from "@tanstack/react-query";
import { MutableRefObject } from "react";

export interface PopupRef {
  show: (failedQuery: QueryKey) => void;
  hide: () => void;
}

export default class PopupController {
  static popupRef: MutableRefObject<PopupRef>;

  static setGlobalPopupRef = (ref: MutableRefObject<PopupRef>) =>
    (this.popupRef = ref);

  static showGlobalPopup = (failedQuery: QueryKey) =>
    this.popupRef.current?.show(failedQuery);

  static hideGlobalPopup = () => this.popupRef.current?.hide();
}
