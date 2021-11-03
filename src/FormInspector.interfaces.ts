import { DataFieldSchema } from './interfaces';

export interface FormComponentBase {
    properties?: {
        type?: string;
        size?: number;
    }
    type?: string;
    components?: FormComponentBase[];
}

export interface ComponentInspectorBase {
    inspect(component: FormComponentBase): DataFieldSchema;
}

export interface CompositeComponentInspectorBase {
    inspect(component: FormComponentBase): DataFieldSchema[];
}

export interface FormInspectorBase {
    componentInspectors: Map<string, ComponentInspectorBase>;
    compositeComponentInspectors: Map<string, CompositeComponentInspectorBase>;
}