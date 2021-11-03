import { ComponentInspector } from './ComponentInspector'
import { DataFieldSchema } from './interfaces';
import { JsonFormComponent } from './JsonFormInspector.interfaces';

export class TimeComponentInspector extends ComponentInspector {
    constructor() {
        super();
    }
    inspect(component: JsonFormComponent): DataFieldSchema {
        const dataField = super.inspect(component);
        if (dataField.type == null) {
            dataField.type = 'Text';
            dataField.size = 8;
        }
        return dataField;
    }
}