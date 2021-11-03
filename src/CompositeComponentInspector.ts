import { DataFieldSchema } from './interfaces';
import { FormInspectorBase, FormComponentBase, CompositeComponentInspectorBase } from './FormInspector.interfaces';

export class CompositeComponentInspector implements CompositeComponentInspectorBase {

    constructor(protected container: FormInspectorBase) {
    }

    inspect(component: FormComponentBase): DataFieldSchema[] {
        if (Array.isArray(component.components)) {
            const fields: DataFieldSchema[] = [];
            component.components.forEach((item) => {
                // if component has components
                if (Array.isArray(component.components)) {
                    // get composite inspector
                    const compositeInspector = this.container.componentInspectors.get(item.type);
                    if (compositeInspector) {
                        // and finally add extra fields
                        const extraFields =compositeInspector.inspect(component);
                        fields.push.apply(fields, extraFields);
                    }
                } else {
                    // get component inspector
                    const componentInspector = this.container.componentInspectors.get(item.type);
                    if (componentInspector) {
                        // add data field
                        fields.push(componentInspector.inspect(item));
                    }
                }
            });
        }
        return [];
    }
}
