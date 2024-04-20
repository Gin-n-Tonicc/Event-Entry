let isInitialAuth = false;

export const initialAuth = {
  hasFinishedInitialAuth() {
    return isInitialAuth === true;
  },
  finishInitialAuth() {
    isInitialAuth = true;
  },
};
