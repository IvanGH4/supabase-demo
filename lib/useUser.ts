import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client'
import { User } from '@/types/user';

export const useUser = () => {
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserData(user as User);
    }
    getUserData();
  }, [])
  return userData;
}
