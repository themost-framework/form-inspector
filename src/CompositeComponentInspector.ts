import { DataFieldSchema } from './interfaces';
import { FormInspectorBase, FormComponentBase, CompositeComponentInspectorBase } from './FormInspector.interfaces';

declare interface PersistentComponent extends FormComponentBase {
    persistent?: boolean | string;
}

export class CompositeComponentInspector implements CompositeComponentInspectorBase {

    constructor(protected container: FormInspectorBase) {
    }

    inspect(component: FormComponentBase): DataFieldSchema[] {
        const fields: DataFieldSchema[] = [];
        if (Array.isArray(component.components)) {
            component.components.map((item: PersistentComponent) => {
                // restore persistent property
                if (Object.prototype.hasOwnProperty.call(item, 'persistent') === false) {
                    item.persistent = true;
                } else if (typeof item.persistent !== 'boolean') {
                    item.persistent = (item.persistent !== 'client-only');
                }
                return item;
            }).forEach((item) => {
                const inspector = this.container.componentInspectors.get(item.type);
                if (inspector) {
                    if (item.persistent) {
                        fields.push(inspector.inspect(item));
                    }
                } else {
                    const compositeInspector = this.container.compositeComponentInspectors.get(item.type);
                    if (compositeInspector) {
                        fields.push.apply(fields, compositeInspector.inspect(item));
                    }
                }
            });
        }
        return fields;
    }
}
