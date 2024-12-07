import { SignInDto, SignUpDto } from '~/generated/auth/@types';
import { getAuthApiClient } from './authApi.client';

export const postValidateSignUp = async (data: SignUpDto) => {
  const response = await getAuthApiClient().auth.validateSignUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { errors: response.body.errors };
};

export const postSignUp = async (data: SignUpDto) => {
  const response = await getAuthApiClient().auth.signUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { result: response.body.result };
};

export const postSignIn = async (data: SignInDto) => {
  const response = await getAuthApiClient({ credentials: 'include' }).auth.signIn.post({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  return response.body;
};

export const checkSignedIn = async () => {
  return await getAuthApiClient({ credentials: 'include' }).auth.checkSignedIn.$get();
};
