import { ComponentInspector } from './ComponentInspector';
import { JsonFormComponent } from './JsonFormInspector.interfaces';

export class SelectComponentInspector extends ComponentInspector {
    constructor() {
        super();
    }
    inspect(component: JsonFormComponent) {
        const dataField = super.inspect(component);
        if (dataField.type == null) {
            // add from dataType
            switch (component.dataType) {
                case 'boolean':
                    dataField.type = 'Boolean'
                    break;
                case 'string':
                    dataField.type = 'Text'
                    break;
                case 'number':
                    dataField.type = 'Number'
                    break;
                case 'number':
                    dataField.type = 'Number'
                    break;
                default:
                    dataField.type = 'Text'
                    break;
            }
        }
        return dataField;
    }
}