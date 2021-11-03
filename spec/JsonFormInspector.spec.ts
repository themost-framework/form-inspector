import { JsonFormInspector, DataModelSchema } from '../src/index';
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
    it('should inspect fields', () => {
        const inspector = new JsonFormInspector();
        const form1: any = require('./examples/form1.json');
        const model: DataModelSchema = inspector.inspect(form1);
        expect(model).toBeTruthy();
        expect(model.fields.length).toBeGreaterThan(0, 'model.fields.length');
    });
});