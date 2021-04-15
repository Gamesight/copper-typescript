export interface Activity {
    id?: number;
    type: {
        id: number;
        category: string;
    };
    parent: {
        id: number;
        type: string;
    };
    details: string;
    user_id?: number;
    activity_date?: number;
    old_value: any;
    new_value: any;
    date_created?: number;
    date_modified?: number;
}
