import { useImmer } from "use-immer";

interface UseStackProps<T> {
  initStackList: T[];
}

export function useStack<T>({ initStackList }: UseStackProps<T>) {
  const [viewStack, setViewStack] = useImmer<T[]>(initStackList);
  const stackTop = viewStack[viewStack.length - 1];

  const stackIn = (next: any) => {
    setViewStack((draft) => {
      draft.push(next);
    });
  };

  const stackOut = () => {
    setViewStack((draft) => {
      draft.pop();
    });
  };

  return {
    stackTop,
    stackIn,
    stackOut
  };
}
