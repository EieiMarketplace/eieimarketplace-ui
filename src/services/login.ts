export async function loginService(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    }
  );
  console.log(`Hello ${process.env.NEXT_PUBLIC_API_URL}/users/login`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}
