export interface Project {
    id?: number;
    name: string;
    related_resource?: {
        id: number;
        type: string;
    };
    assignee_id?: number;
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
