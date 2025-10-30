export async function loginService(credentials: {
  email: string;
  password: string;
}) {
  const apiUrl = process.env.API_URL;

  console.log("🔐 Login Service - Attempting authentication");
  console.log("📍 API URL:", apiUrl);
  console.log("📧 Email:", credentials.email);

  const response = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}
