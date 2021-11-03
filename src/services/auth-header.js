export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    // For Spring Boot back-end
    return  "Bearer " + user.access_token;
  } else {
    return null;
  }
}
