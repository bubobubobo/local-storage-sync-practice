import { useState } from "react";

type Store<T> = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => T;
};

/**
 *
 * @param key : storage에 접근하기 위한 key
 * @param defaultValue : storage에 값이 없는 경우 return할 값
 */
export const useStore = <T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}) => {
  const [store, setStore] = useState<Store<T>>({
    subscribe: () => () => {},
    getSnapshot: () => defaultValue,
  });

  const setItem = (item: T) => {
    const itemStr = JSON.stringify(item);
    window.localStorage.setItem(key, itemStr);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: key,
        newValue: itemStr,
      })
    );
  };

  const initStore = () => {
    setStore({
      subscribe: (onStoreChange) => {
        window.addEventListener("storage", onStoreChange);
        return () => void window.removeEventListener("storage", onStoreChange); // NOTE : 반환값 undefined로 명시
        return () => {};
      },
      getSnapshot: () => {
        const itemStr = localStorage.getItem(key);
        if (itemStr) return JSON.parse(itemStr);

        setItem(defaultValue);
        return defaultValue;
      },
    });
  };

  return {
    store,
    initStore,
    setItem,
  };
};
