
export default async function Page({ params: { token } }: { params: { token: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/verify-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token}),
  });

  const data = await response.json();

  return <></>;
}
