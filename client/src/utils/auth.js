// naive JWT parse to get user profile (token payload)
export function getProfileFromToken(token) {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload);
    const obj = JSON.parse(json);
    return { id: obj.id };
  } catch (e) {
    return null;
  }
}
