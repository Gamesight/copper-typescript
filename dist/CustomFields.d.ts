export declare type RecordType = "lead" | "person" | "opportunity" | "company" | "project" | "task";
export declare const ALL_RECORD_TYPES: RecordType[];
export interface CustomActivityType {
    id: number;
    company_id: number;
    icon_type: string;
    is_disabled: boolean;
    is_interaction: boolean;
    name: string;
    is_default_task_type: any;
}
export interface CustomField {
    name: string;
    data_type: "Checkbox" | "Currency" | "Date" | "Dropdown" | "Float" | "MultiSelect" | "Percentage" | "String" | "Text" | "URL";
    id?: number;
    available_on?: RecordType[];
    options?: any[];
    currency?: string;
}
export interface ListCustomFieldRequestParams {
    id?: number;
    name?: string;
    data_type?: string[];
    currency?: string[];
    options?: any[];
}
export interface Connection {
    custom_field_definition_id: number;
    source: {
        id: number;
        entity_type: RecordType;
    };
    target: {
        id: number;
        entity_type: RecordType;
    };
}
export interface Relation {
    id: number;
    type: RecordType;
}
export interface Subscription {
    id?: number;
    target: string;
    type: RecordType;
    event: string;
    secret: {
        secret: string;
        key: string;
    };
    created_at?: number;
}
export interface DeleteResponse {
    id: number;
    is_deleted: boolean;
}
