import { useSelector, useDispatch } from "react-redux";
import { signIn, signUp, signOut, clearError } from "../store/authSlice";

export function useAuth() {
    const dispatch = useDispatch();
    const { user, role, isLoading, isInitialized, error } = useSelector((state) => state.auth)

    return {
    user,
    role,
    isLoading,
    isInitialized,
    isAuthenticated: !!user,
    isAdmin: role === 'admin',
    error,
    signIn: (credentials) => dispatch(signIn(credentials)),
    signUp: (credentials) => dispatch(signUp(credentials)),
    signOut: () => dispatch(signOut()),
    clearError: () => dispatch(clearError()),
  }
}