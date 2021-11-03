import { JsonFormComponentInspector } from './JsonFormComponentInspector'
import { DataFieldSchema } from './interfaces';
import { JsonFormComponent } from './JsonFormInspector.interfaces';

declare interface DateTimeComponent {
    enableTime?: boolean;
}

export class DateTimeComponentInspector extends JsonFormComponentInspector {
    constructor() {
        super();
    }
    inspect(component: JsonFormComponent): DataFieldSchema {
        const dataField = super.inspect(component);
        const dateTimeComponent  = component as DateTimeComponent;
        if (dataField.type == null) {
            if (dateTimeComponent.enableTime === false) {
                dataField.type = 'Date';
            } else {
                dataField.type = 'DateTime';
            }
        }
        return dataField;
    }
}