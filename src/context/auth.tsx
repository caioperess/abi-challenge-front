import { SignInType } from '@/app/(public)/schema';
import { UsersService } from '@/services/users';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { redirect, RedirectType } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo } from 'react';

interface IAuthContextData {
  signIn: (data: SignInType) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const signIn = async (data: SignInType) => {
    try {
      const response = await UsersService.authenticate(data);

      await setCookie('accessToken', response.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      await setCookie('userId', response.user.id, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    await removeCookie('accessToken');

    redirect('/sign-in', RedirectType.replace);
  };

  const values = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [],
  );

  useEffect(() => {
    async function loadCredentials() {
      const accessToken = await getCookie('accessToken');
      const userId = await getCookie('userId');

      if (!accessToken || !userId) {
        signOut();
      }
    }

    loadCredentials();
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
