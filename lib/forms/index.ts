export interface IFormComponent {
    validate?: () => boolean;
    validators?: IValidator[];
    dataLabel?: string;
    transport?: (dataLabel: string, value: any, valid: boolean, validate: () => boolean) => void;
}

export interface IValidator {
    validate: (value: any) => boolean;
    errorMessage?: string;
}

export interface IForm {
    [key: string]: {
        value: string;
        valid?: boolean;
        validate?: () => void;
    };
}

export const NotEmpty: IValidator = {
    validate: (value) => value.length > 0,
    errorMessage: 'This field is required'
}   