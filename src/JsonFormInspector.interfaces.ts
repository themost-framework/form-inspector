import { DataFieldSchema } from './interfaces';

export interface JsonForm {
    properties?: {
        name: string,
        version: string,
        hidden?: boolean,
        inherits?: string,
        implements?: string
    },
    [k: string]: unknown;
}

export interface JsonFormComponent {
    label: string,
    key: string,
    type?: string,
    validate?: {
        required?: boolean,
        minLength?: number,
        maxLength?: number,
        pattern?: string,
        customMessage?: string
    },
    properties?: {
        type?: string;
        size?: number;
    },
    dataType?: string;
    persistent?: boolean | string;
}

export interface JsonFormComponentContainer {
    components?: JsonFormComponent[]
}
