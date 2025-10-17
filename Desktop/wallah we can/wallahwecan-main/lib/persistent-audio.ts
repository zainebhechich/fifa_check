// Removed persistent audio implementation; exported no-op API to avoid import errors during refactor.
export const persistentAudio = {
  addListener: (_: (playing: boolean) => void) => {},
  removeListener: (_: (playing: boolean) => void) => {},
  toggle: async () => {},
  getIsPlaying: () => false,
};
