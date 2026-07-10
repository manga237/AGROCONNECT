export async function logi() {
  const a = await fetch("http://localhost:3000/api/login", {
    credentials: "include",
  });

  return a.status;
}
