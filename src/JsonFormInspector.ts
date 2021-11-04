import {Args} from '@themost/common';
import { DataModelSchema, DataFieldSchema } from './interfaces';
import { JsonForm, JsonFormComponentContainer } from './JsonFormInspector.interfaces';
import { ComponentInspector } from './ComponentInspector';
import { RadioComponentInspector } from './RadioComponentInspector';
import { SelectComponentInspector } from './SelectComponentInspector';
import { SelectBoxesComponentInspector } from './SelectBoxesComponentInspector';
import { DayComponentInspector } from './DayComponentInspector';
import { TimeComponentInspector } from './TimeComponentInspector';
import { DateTimeComponentInspector } from './DateTimeComponentInspector';
import { FormInspectorBase } from './FormInspector.interfaces';
import { CompositeComponentInspector } from './CompositeComponentInspector';
import { ColumnsComponentInspector } from './ColumnsComponentInspector';
import { SurveyComponentInspector } from './SurveyComponentInspector';
import { FORM_MODEL } from './FormModel';

export class JsonFormInspector implements FormInspectorBase {
    public componentInspectors: Map<string, ComponentInspector>;
    public compositeComponentInspectors: Map<string, CompositeComponentInspector>;
    constructor() {
        this.componentInspectors = new Map([
            // basic
            ['textfield', new ComponentInspector('Text')],
            ['textarea', new ComponentInspector('Note')],
            ['number', new ComponentInspector('Number')],
            ['password', new ComponentInspector('Text')],
            ['checkbox', new ComponentInspector('Boolean')],
            ['selectboxes', new SelectBoxesComponentInspector()],
            ['select', new SelectComponentInspector()],
            ['radio', new RadioComponentInspector()],
            // advanced
            ['email', new ComponentInspector('Email')],
            ['url', new ComponentInspector('Url')],
            ['phoneNumber', new ComponentInspector('Text')],
            ['datetime', new DateTimeComponentInspector()],
            ['day', new DayComponentInspector()],
            ['time', new TimeComponentInspector()],
            ['currency', new ComponentInspector('Number')],
            //
        ]);
        this.compositeComponentInspectors = new Map([
            // advanced
            ['survey', new SurveyComponentInspector(this)],
            // layout
            [ 'fieldset', new CompositeComponentInspector(this) ],
            [ 'columns', new ColumnsComponentInspector(this) ],
            [ 'panel', new CompositeComponentInspector(this) ],
            [ 'well', new CompositeComponentInspector(this) ],
            [ 'tabs', new CompositeComponentInspector(this) ],
        ]);
    }
    inspect(form: JsonForm) {
        if (form == null) {
            return null;
        }
        Args.check((form.properties && form.properties.name) != null, 'Form name may not be null');
        const model: DataModelSchema = {
            name: form.properties.name,
            version: form.properties.version || '0.1',
            abstract: false,
            hidden: form.properties.hidden != null ? form.properties.hidden : true,
            caching: 'none',
            sealed: false,
            inherits: form.properties.inherits,
            implements: form.properties.implements,
            fields: [
            ],
            constraints: [],
            eventListeners: [],
            privileges: [
                {
                    type: 'global',
                    mask: 15
                },
                {
                    type: 'global',
                    mask: 15,
                    account: 'Administrators'
                }
            ]
        };
        // if model does not inherit or implement another model
        if (model.inherits == null && model.implements == null) {
            // add common attributes
            model.fields.push.apply(model.fields, FORM_MODEL.fields);
        }
        const container = form as JsonFormComponentContainer;
        if (Array.isArray(container.components)) {
            // enumerate components
            container.components.map((item) => {
                // restore persistent property
                if (Object.prototype.hasOwnProperty.call(item, 'persistent') === false) {
                    item.persistent = true;
                } else if (typeof item.persistent !== 'boolean') {
                    item.persistent = (item.persistent !== 'client-only');
                }
                return item;
            }).forEach((item) => {
                const inspector = this.componentInspectors.get(item.type);
                if (inspector) {
                    if (item.persistent) {
                        model.fields.push(inspector.inspect(item));
                    }
                } else {
                    const compositeInspector = this.compositeComponentInspectors.get(item.type);
                    if (compositeInspector) {
                        model.fields.push.apply(model.fields, compositeInspector.inspect(item));
                    }
                }
            });
        }
        return model;
    }
}