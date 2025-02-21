import { create } from "zustand";

import { Mail, mails } from "./data";

type Config = {
  selected: Mail["id"] | null;
  setSelected: (id: Mail["id"] | null) => void;
};

const useMailStore = create<Config>(set => ({
  selected: mails[0].id,
  setSelected: id => set({ selected: id }),
}));

export { useMailStore };
