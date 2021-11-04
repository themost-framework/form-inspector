import { JsonFormInspector, DataModelSchema } from '../src/index';
import { TraceUtils } from '@themost/common';
describe('FormInspector', () => {
    it('should create instance', () => {
        const inspector = new JsonFormInspector();
        expect(inspector).toBeTruthy();
    });
    it('should inspect form', () => {
        const inspector = new JsonFormInspector();
        const form1: any = require('./examples/form1.json');
        const model: DataModelSchema = inspector.inspect(form1);
        expect(model).toBeTruthy();
        expect(model.name).toBe('PersonForm');
        expect(model.version).toBe('1.0');
    });
    it('should inspect text fields', () => {
        const inspector = new JsonFormInspector();
        const form1: any = require('./examples/form1.json');
        const model: DataModelSchema = inspector.inspect(form1);
        TraceUtils.info(JSON.stringify(model, null, 2));
        expect(model).toBeTruthy();
        expect(model.fields.length).toBeGreaterThan(0, 'model.fields.length');
        const givenName = model.fields.find((field) => field.name === 'givenName');
        expect(givenName).toBeTruthy();
    });
    it('should inspect composite component', () => {
        const inspector = new JsonFormInspector();
        const form1: any = require('./examples/example1.json');
        const model: DataModelSchema = inspector.inspect(form1);
        expect(model).toBeTruthy();
        TraceUtils.info(JSON.stringify(model, null, 2));
        expect(model.fields.length).toBeGreaterThan(0, 'model.fields.length');
        const firstName = model.fields.find((field) => field.name === 'firstName');
        expect(firstName).toBeTruthy();
    });
});