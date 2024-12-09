export default async function favoriteDelete(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/${id}/dislike`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};