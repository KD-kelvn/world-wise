import { createContext, useContext, useReducer } from "react";
import { reducer } from "./FakeAuthReducer";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function handleLogin(email, pswd) {
    if (email === FAKE_USER.email && pswd === FAKE_USER.password)
      dispatch({ type: "LOGIN", payload: FAKE_USER });
  }

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
