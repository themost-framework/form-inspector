import { DataModelSchema } from './interfaces';

export const FORM_MODEL: DataModelSchema = {
    name: 'Form',
    version: '0.1',
    abstract: false,
    hidden: true,
    caching: 'none',
    fields: [{
        '@id': 'https://themost.io/schemas/id',
        'name': 'id',
        'type': 'Counter',
        'primary': true
    },
    {
        '@id': 'https://themost.io/schemas/dateModified',
        'name': 'dateModified',
        'type': 'DateTime',
        'readonly': true,
        'value': 'javascript:return (new Date());',
        'calculation': 'javascript:return (new Date());'
    },
    {
        '@id': 'https://themost.io/schemas/createdBy',
        'name': 'createdBy',
        'type': 'Integer',
        'readonly': true,
        'value': 'javascript:return this.user();'
    },
    {
        '@id': 'https://themost.io/schemas/modifiedBy',
        'name': 'modifiedBy',
        'type': 'Integer',
        'readonly': true,
        'value': 'javascript:return this.user();',
        'calculation': 'javascript:return this.user();'
    }
    ],
    constraints: [],
    eventListeners: [],
    privileges: [
        {
            'type': 'global',
            'mask': 15
        },
        {
            'type': 'global',
            'mask': 15,
            'account': 'Administrators'
        }
    ]
}