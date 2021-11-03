import { JsonFormComponent } from './JsonFormInspector.interfaces';
import { DataFieldSchema } from './interfaces';
import { JsonFormComponentInspector } from './JsonFormComponentInspector';

export class TextComponentInspector extends JsonFormComponentInspector {
    inspect(component: JsonFormComponent): DataFieldSchema {
        const result = Object.assign(super.inspect(component), {
            type: 'Text'
        });
        return result;
    }
}