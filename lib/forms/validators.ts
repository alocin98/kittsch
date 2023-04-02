import { i18n, LOCALES, setLocale } from '@src/localization';
import { IValidator } from 'kittsch/forms';

import { Validator } from '.';

setLocale(LOCALES.de);

export const useEmailValidator = (errorMessage: string) => {
  return {
    validate: (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    },
    errorMessage,
  } as Validator;
};

export const useNotEmptyValidator = (errorMessage: string) => {
  return {
    validate: (value) => {
      return value !== '';
    },
    errorMessage,
  } as Validator;
};

export const useWeakPasswordValidator = (errorMessage: string) => {
  return {
    validate: (value) => {
      const regex = /^(?=.*\d).{8,}$/;
      return regex.test(value);
    },
    errorMessage,
  } as Validator;
};

export const useTruthyValidator = (errorMessage: string) => {
  return {
    validate: (value) => {
      return !!value;
    },
    errorMessage,
  } as Validator;
}
