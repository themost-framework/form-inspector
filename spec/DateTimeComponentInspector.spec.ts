import { JsonFormInspector, DataModelSchema } from '../src/index';
describe('DateTimeComponentInspector', () => {
    it('should inspect date field', () => {
        const inspector = new JsonFormInspector();
        const model: DataModelSchema = inspector.inspect({
            'properties': {
                'name': 'TestFormItem',
                'version': '1.0',
            },
            'components': [
                {
                    'label': 'Date / Time',
                    'format': 'yyyy-MM-dd',
                    'tableView': false,
                    'enableMinDateInput': false,
                    'datePicker': {
                        'disableWeekends': false,
                        'disableWeekdays': false
                    },
                    'enableMaxDateInput': false,
                    'enableTime': false,
                    'key': 'dateTime',
                    'type': 'datetime',
                    'input': true,
                    'widget': {
                        'type': 'calendar',
                        'displayInTimezone': 'viewer',
                        'locale': 'en',
                        'useLocaleSettings': false,
                        'allowInput': true,
                        'mode': 'single',
                        'enableTime': false,
                        'noCalendar': false,
                        'format': 'yyyy-MM-dd',
                        'hourIncrement': 1,
                        'minuteIncrement': 1,
                        'time_24hr': false,
                        'disableWeekends': false,
                        'disableWeekdays': false
                    }
                }
            ]
        });
        expect(model).toBeTruthy();
        expect(model.name).toBe('TestFormItem');
        expect(model.version).toBe('1.0');
        const field = model.fields.find((item) => item.name === 'dateTime');
        expect(field).toBeTruthy();
        expect(field.type).toBe('Date');
    });
});