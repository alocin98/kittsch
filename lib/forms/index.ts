export type Validator = {
  validate: (value: string) => boolean;
  errorMessage: string;
};
export type Form = {
  [key: string]: { value: any; error: string; validators: Validator[] };
};
export function validate(form: Form, stopWhenOneFieldInvalidate?: boolean): [Form, boolean] {
  if(!stopWhenOneFieldInvalidate) stopWhenOneFieldInvalidate = true;
  Object.keys(form).every((key) => {
    const field = form[key];
    field.error = field.validators.reduce((error, validator) => {
      return error || validator.validate(field.value) ? '' : validator.errorMessage;
    }, '');
    if (stopWhenOneFieldInvalidate && field.error) {
      return false;
    }
  });
  const isValid = Object.keys(form).every((key) => {
    return form[key].error === '';
  });
  return [form, isValid];
}
