import { ComponentInspector } from './ComponentInspector'
import { DataFieldSchema } from './interfaces';
import { JsonFormComponent } from './JsonFormInspector.interfaces';

export class SelectBoxesComponentInspector extends ComponentInspector {
    constructor() {
        super();
    }
    inspect(component: JsonFormComponent): DataFieldSchema {
        const dataField = super.inspect(component);
        if (dataField.type == null) {
            dataField.type = 'Text';
        }
        dataField.many = true;
        return dataField;
    }
}