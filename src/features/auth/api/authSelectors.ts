import type { RootState } from "app/store"

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn
