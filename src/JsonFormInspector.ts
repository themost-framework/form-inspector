import {Args} from '@themost/common';
import { DataModelSchema, DataFieldSchema } from './interfaces';
import { JsonForm, JsonFormComponentContainer, JsonFormComponent } from './JsonFormInspector.interfaces';
import { JsonFormComponentInspector } from './JsonFormComponentInspector';

const COMMON_ATTRIBUTES: DataFieldSchema[] = [
    {
        '@id': 'https://themost.io/schemas/id',
        'name': 'id',
        'title': 'ID',
        'description': 'The identifier of the item.',
        'type': 'Counter',
        'primary': true
    },
    {
        '@id': 'https://themost.io/schemas/dateModified',
        'name': 'dateModified',
        'title': 'dateModified',
        'description': 'The date on which this item was most recently modified.',
        'type': 'DateTime',
        'readonly': true,
        'value': 'javascript:return (new Date());',
        'calculation': 'javascript:return (new Date());'
    },
    {
        '@id': 'https://themost.io/schemas/createdBy',
        'name': 'createdBy',
        'title': 'createdBy',
        'description': 'Created by user.',
        'type': 'Integer',
        'readonly': true,
        'value': 'javascript:return this.user();'
    },
    {
        '@id': 'https://themost.io/schemas/modifiedBy',
        'name': 'modifiedBy',
        'title': 'modifiedBy',
        'description': 'Last modified by user.',
        'type': 'Integer',
        'readonly': true,
        'value': 'javascript:return this.user();',
        'calculation': 'javascript:return this.user();'
    }
];

export class JsonFormInspector {
    constructor() {
        //
    }
    inspect(form: JsonForm) {
        if (form == null) {
            return null;
        }
        Args.check((form.properties && form.properties.name) != null, 'Form name may not be null');
        const model: DataModelSchema = {
            name: form.properties.name,
            version: form.properties.version || '0.1',
            abstract: false,
            hidden: form.properties.hidden != null ? form.properties.hidden : false,
            caching: 'none',
            sealed: false,
            inherits: form.properties.inherits,
            implements: form.properties.implements,
            fields: [
            ],
            constraints: [],
            eventListeners: [],
            privileges: [
                {
                    type: 'global',
                    mask: 15
                },
                {
                    type: 'global',
                    mask: 15,
                    account: 'Administrators'
                }
            ]
        };
        // if model does not inherit or implement another model
        if (model.inherits == null && model.implements == null) {
            // add common attributes
            model.fields.push.apply(model.fields, COMMON_ATTRIBUTES);
        }
        const container = form as JsonFormComponentContainer;
        if (Array.isArray(container.components)) {
            // enumerate components
            container.components.forEach((item) => {
                model.fields.push(new JsonFormComponentInspector().inspect(item));
            });
        }
        return model;
    }

    inspectComponent(component: JsonFormComponent): DataFieldSchema {
        const result: DataFieldSchema = {
            name: component.key,
            title: component.label,
            nullable: false,
            validation: {}
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
            result.nullable = component.validate.required != null ? component.validate.required : false;
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
        return result;
    }

}