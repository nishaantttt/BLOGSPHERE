// Decodes a JWT payload without any extra library (JWTs are just base64url JSON)
export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded; // { id, role, iat, exp }
  } catch (err) {
    return null;
  }
}

export function isAdmin() {
  const user = getUserFromToken();
  return user?.role === "admin";
}