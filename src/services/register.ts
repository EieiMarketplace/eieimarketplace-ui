export async function registerService(credentials: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  role: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        password: credentials.password,
        phone_number: credentials.phone_number,
        role: credentials.role,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  const data = await response.json();
  return data;
}
