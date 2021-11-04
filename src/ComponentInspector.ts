import { DataFieldSchema } from './interfaces';
import { JsonFormComponent } from './JsonFormInspector.interfaces';
import { ComponentInspectorBase } from './FormInspector.interfaces';

export class ComponentInspector implements ComponentInspectorBase {

    constructor(protected type?: string) {
    }

    inspect(component: JsonFormComponent): DataFieldSchema {
        const result: DataFieldSchema = {
            name: component.key,
            title: component.label,
            nullable: true,
            validation: {}
        }
        if (this.type) {
            result.type = this.type;
        }
        if (component.properties) {
            // set type
            if (component.properties.type) {
                result.type = component.properties.type;
            }
            // set size
            if (component.properties.size) {
                result.size = component.properties.size;
            }
        }
        if (component.validate) {
            // set nullable
            if (Object.prototype.hasOwnProperty.call(component.validate, 'required')) {
                result.nullable = !component.validate.required;
            }
            if (component.validate.maxLength) {
                // set validation.maxLength
                result.validation.maxLength = component.validate.maxLength;
            }
            if (component.validate.minLength) {
                // set validation.minLength
                result.validation.minLength = component.validate.minLength;
            }
            if (component.validate.pattern) {
                // set validation.pattern
                result.validation.pattern = component.validate.pattern;
            }
            if (component.validate.customMessage) {
                // set validation.message
                result.validation.message = component.validate.customMessage;
            }
        }
        // cleanup
        if (Object.keys(result.validation).length === 0) {
            delete result.validation;
        }
        return result;
    }
}
