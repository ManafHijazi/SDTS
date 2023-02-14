import { HttpServices } from '../Helpers';

export const LoginService = async (body) => {
  const result = await HttpServices.post('api/v1/auth/login', body)
    .then((data) => data)
    .catch((error) => error.response);

  return result;
};

export const LogoutService = async () => {
  const result = await HttpServices.get('api/v1/auth/logout')
    .then((data) => data)
    .catch((error) => error.response);

  return result;
};

export const ChangePasswordService = async (body) => {
  const result = await HttpServices.post('api/v1/auth/change_password', body)
    .then((data) => data)
    .catch((error) => error.response);

  return result;
};

