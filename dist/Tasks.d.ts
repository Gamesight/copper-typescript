export interface Task {
    id?: number;
    name: string;
    related_resource?: {
        id: number;
        type: string;
    };
    assignee_id?: number;
    due_date?: number;
    reminder_date?: number;
    completed_date?: number;
    priority?: "None" | "High";
    status?: "Open" | "Completed";
    details?: string;
    tags?: string[];
    date_created?: number;
    date_modified?: number;
    custom_fields?: {
        custom_field_definition_id: number;
        value: string;
    }[];
}
