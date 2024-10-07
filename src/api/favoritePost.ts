export default async function favoritePost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/${id}/like`, {
    method: 'POST',
    credentials: 'include',
  });

  return response;
};