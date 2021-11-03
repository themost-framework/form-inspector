import { FormInspectorBase, FormComponentBase } from './FormInspector.interfaces';
import { DataFieldSchema } from './interfaces';
import { CompositeComponentInspector } from './CompositeComponentInspector';

declare interface ColumnFormComponentBase extends FormComponentBase {
    columns: FormComponentBase[];
}

export class ColumnsComponentInspector extends CompositeComponentInspector {
    constructor(protected container: FormInspectorBase) {
        super(container);
    }
    inspect(component: FormComponentBase): DataFieldSchema[] {
        const cmp = component as ColumnFormComponentBase;
        const results: DataFieldSchema[] = []
        if (Array.isArray(cmp.columns)) {
            cmp.columns.forEach((column) => {
                const addFields = new CompositeComponentInspector(this.container).inspect(column);
                results.push.apply(results, addFields);
            });
        }
        return results;
    }
}