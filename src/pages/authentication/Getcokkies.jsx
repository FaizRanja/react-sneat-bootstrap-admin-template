import Cookies from 'js-cookie';

export const Getcokkies = (name) => {
  return Cookies.get(name) || null; // Safely return the token
};
