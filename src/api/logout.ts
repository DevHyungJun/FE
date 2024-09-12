// import axios from "axios";

export const logout = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return await response.json();
};

