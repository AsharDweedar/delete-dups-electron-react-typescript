/** PathMVC model definitions **/

export interface PathModel {
    id: number;
    path: string;
    recursively: boolean;
    scan_completed: boolean;
}

export namespace PathModel {
    // export enum Filter {
    //     SHOW_ALL = 'all',
    //     SHOW_ACTIVE = 'active',
    //     SHOW_COMPLETED = 'completed'
    // }
}
