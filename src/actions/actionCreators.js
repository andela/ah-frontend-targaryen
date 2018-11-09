import {
  SOCIAL_LOGIN_INITIATED,
  SOCIAL_LOGIN_SUCCESS,
} from './types';

export const socialLoginInitiated = () => ({
  type: SOCIAL_LOGIN_INITIATED,
});


export const socialLoginSuccess = () => ({
  type: SOCIAL_LOGIN_SUCCESS,
});
