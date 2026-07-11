export interface Session {
  name: string;
}

const SESSION_KEY = "session";

export const createSession = (user: Session) => {
  localStorage.setItem("session", JSON.stringify(user));
};

export const getSession = (): Session | null => {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session);
};

export const removeSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
