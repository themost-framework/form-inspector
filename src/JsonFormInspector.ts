import {Args} from '@themost/common';
import { DataModelSchema } from './interfaces';

export interface JsonForm {
    properties?: {
        name: string,
        version: string
    }
}
export class JsonFormInspector {
    constructor() {
        //
    }
    inspect(form: JsonForm) {
        if (form == null) {
            return null;
        }
        Args.check(form.properties && form.properties.name != null, new Error('Form.name may not be null'));
        const model: DataModelSchema = {
            name: form.properties.name,
            version: form.properties.version || '0.1',
            fields: [],
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
        }
        return model;
    }
}