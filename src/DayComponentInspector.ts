import { JsonFormComponentInspector } from './JsonFormComponentInspector'
import { DataFieldSchema } from './interfaces';
import { JsonFormComponent } from './JsonFormInspector.interfaces';

export class DayComponentInspector extends JsonFormComponentInspector {
    constructor() {
        super();
    }
    inspect(component: JsonFormComponent): DataFieldSchema {
        const dataField = super.inspect(component);
        if (dataField.type == null) {
            dataField.type = 'Text';
            dataField.size = 10;
        }
        return dataField;
    }
}