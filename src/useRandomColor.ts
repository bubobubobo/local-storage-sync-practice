import { useEffect } from "react";
import { useStore } from "./useStore";

export type Color = string;

export const useRandomColor = () => {
  const key = "button-color";
  const defaultColor = "#000";

  const { store, initStore, setItem } = useStore<Color>({
    key,
    defaultValue: defaultColor,
  });

  useEffect(() => {
    initStore();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const changeColor = () => {
    const randomColor = getRandomColor();
    setItem(randomColor);
  };

  return {
    store,
    changeColor,
  };
};
