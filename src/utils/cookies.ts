'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function setCookie(
  name: string,
  value: string,
  options: Partial<ResponseCookie>,
) {
  const parseCookies = await cookies();

  parseCookies.set(name, value, options);
}

export async function getCookie(name: string) {
  const parseCookies = await cookies();

  return parseCookies.get(name)?.value;
}

export async function removeCookie(name: string) {
  const parseCookies = await cookies();

  parseCookies.delete(name);
}
