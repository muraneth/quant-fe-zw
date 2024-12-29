import { create } from "zustand";
import { UserConfig } from "@/service/explorer";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/utils/store";
import { WritableDraft } from 'immer';


interface ExplorerStore {

    userConfig: UserConfig;

    setDraftData: (callback: (draft: WritableDraft<ExplorerStore>) => void) => void;
}


const useExplorerStore = createSelectors(
    create<ExplorerStore>()(
        immer((set) => ({
            // ...initialState,
            userConfig: {} as UserConfig,


            setDraftData: (callback) =>
                set((draft) => {
                    callback(draft);
                }),
        }))
    )
);

export { useExplorerStore };