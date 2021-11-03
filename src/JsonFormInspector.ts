import {Args} from '@themost/common';
import { DataModelSchema, DataFieldSchema } from './interfaces';
import { JsonForm, JsonFormComponentContainer } from './JsonFormInspector.interfaces';
import { JsonFormComponentInspector } from './JsonFormComponentInspector';
import { RadioComponentInspector } from './RadioComponentInspector';
import { SelectComponentInspector } from './SelectComponentInspector';

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
    public componentInspectors: Map<string, JsonFormComponentInspector>;
    constructor() {
        this.componentInspectors = new Map([
            // basic
            ['textfield', new JsonFormComponentInspector('Text')],
            ['textarea', new JsonFormComponentInspector('Note')],
            ['number', new JsonFormComponentInspector('Number')],
            ['password', new JsonFormComponentInspector('Text')],
            ['checkbox', new JsonFormComponentInspector('Boolean')],
            ['select', new SelectComponentInspector()],
            ['radio', new RadioComponentInspector()],
            // advanced
            ['email', new JsonFormComponentInspector('Email')],
            ['url', new JsonFormComponentInspector('Url')],
            ['phoneNumber', new JsonFormComponentInspector('Text')],
            ['currency', new JsonFormComponentInspector('Number')],
            //
        ]);
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
                const inspector = this.componentInspectors.get(item.type);
                if (inspector) {
                    model.fields.push(inspector.inspect(item));
                }
            });
        }
        return model;
    }
}