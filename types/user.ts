import React from 'react';

export type User = {
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: any[];
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  userMetadata?: {};
};

export type UserContext = {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
