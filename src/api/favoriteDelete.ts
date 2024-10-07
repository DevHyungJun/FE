export default async function favoriteDelete(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/${id}/dislike`, {
    method: 'POST',
    credentials: 'include',
  });

  return response;
};