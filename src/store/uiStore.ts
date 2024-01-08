import { create } from "zustand";

type UIStore = {
    // verticalScroll: number;
    navIsOpen: boolean;
    // enableSounds: boolean;
    // workingYear: number;
    // setVerticalScroll: (verticalScroll: number) => void;
    setNavIsOpen: (navIsOpen: boolean) => void;
    // setEnableSounds: (enableSounds: boolean) => void;
    // setWorkingYear: (workingYear: number) => void;
};

export const useUIStore = create<UIStore>((set) => ({
    // verticalScroll: 0,
    // enableSounds: true,
    navIsOpen: false,
    // workingYear: new Date().getFullYear(),
    // setVerticalScroll: (verticalScroll: number) => set({ verticalScroll }),
    // setEnableSounds: (enableSounds: boolean) => set({ enableSounds }),
    setNavIsOpen: (navIsOpen: boolean) => set({ navIsOpen }),
    // setWorkingYear: (workingYear: number) => set({ workingYear }),
}));
