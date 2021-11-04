# @themost/form-inspector
MOST Web Framework JSON forms-to-model generator

## Installation

    npm i @universis/form-inspector

## Usage

Use `JsonFormInspector` to extract a model definition based on a given JSON form:

    {
        "properties": {
            "version": "1.0",
            "name": "PersonForm"
        },
        "components": [
            {
                "label": "First Name",
                "tableView": true,
                "key": "givenName",
                "properties": {
                    "type": "Text"
                },
                "type": "textfield",
                "input": true
            },
            {
                "label": "Last Name",
                "tableView": true,
                "validate": {
                    "required": true,
                    "maxLength": 128
                },
                "key": "lastName",
                "type": "textfield",
                "input": true
            }
        ]
    }

and inspect model schema:

    import { JsonFormInspector, DataModelSchema } from '@universis/form-inspector';
    const model = inspector.inspect(form1);

with the following result:

    {
        "name": "Example",
        "version": "0.2",
        "abstract": false,
        "hidden": true,
        "caching": "none",
        "sealed": false,
        "fields": [
            {
                "@id": "https://themost.io/schemas/id",
                "name": "id",
                "type": "Counter",
                "primary": true
            },
            {
                "@id": "https://themost.io/schemas/dateModified",
                "name": "dateModified",
                "type": "DateTime",
                "readonly": true,
                "value": "javascript:return (new Date());",
                "calculation": "javascript:return (new Date());"
            },
            {
                "@id": "https://themost.io/schemas/createdBy",
                "name": "createdBy",
                "type": "Integer",
                "readonly": true,
                "value": "javascript:return this.user();"
            },
            {
                "@id": "https://themost.io/schemas/modifiedBy",
                "name": "modifiedBy",
                "type": "Integer",
                "readonly": true,
                "value": "javascript:return this.user();",
                "calculation": "javascript:return this.user();"
            },
            {
                "name": "firstName",
                "title": "First Name",
                "nullable": true,
                "type": "Text"
            },
            {
                "name": "email",
                "title": "Email",
                "nullable": true,
                "type": "Email"
            },
            {
                "name": "lastName",
                "title": "Last Name",
                "nullable": true,
                "type": "Text"
            },
            {
                "name": "phoneNumber",
                "title": "Phone Number",
                "nullable": true,
                "type": "Text"
            },
            {
                "name": "howWouldYouRateTheFormIoPlatform",
                "title": "How would you rate the Form.io platform?",
                "nullable": true,
                "type": "Text"
            },
            {
                "name": "howWasCustomerSupport",
                "title": "How was Customer Support?",
                "nullable": true,
                "type": "Text"
            },
            {
                "name": "overallExperience",
                "title": "Overall Experience?",
                "nullable": true,
                "type": "Text"
            }
        ],
        "constraints": [],
        "eventListeners": [],
        "privileges": [
            {
                "type": "global",
                "mask": 15
            },
            {
                "type": "global",
                "mask": 15,
                "account": "Administrators"
            }
        ]
    }
