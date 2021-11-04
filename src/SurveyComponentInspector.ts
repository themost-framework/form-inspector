import { FormInspectorBase, FormComponentBase } from './FormInspector.interfaces';
import { DataFieldSchema } from './interfaces';
import { CompositeComponentInspector } from './CompositeComponentInspector';
import { ComponentInspector } from './ComponentInspector';

declare interface SurveyFormComponentBase extends FormComponentBase {
    questions: { label: string; value: string};
    values: { label: string; value: string};
    validate?: {
        required?: boolean,
        customMessage?: string
    }
}

export class SurveyComponentInspector extends CompositeComponentInspector {
    constructor(protected container: FormInspectorBase) {
        super(container);
    }
    inspect(component: FormComponentBase): DataFieldSchema[] {
        const cmp = component as SurveyFormComponentBase;
        let results: DataFieldSchema[] = []
        if (Array.isArray(cmp.questions)) {
            results = cmp.questions.map((question) => {
                return new ComponentInspector().inspect({
                    label: question.label,
                    key: question.value,
                    properties: component.properties,
                    validate: cmp.validate
                });
            });
        }
        return results;
    }
}