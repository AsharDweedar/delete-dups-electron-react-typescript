declare module 'belle';
declare interface EventI { value: boolean; target: {}}
declare interface ConclusionI{
    Time: string;
    Folders: number;
    Files: number;
    Duplicates: object;
    started: TimeRanges;
    finished: TimeRanges;
}
declare interface DupI {
    path: string;
    duplicateNum: number;
}
declare interface propsInterface { list: Array<DupI> }

/* paths interfaces */
declare interface pathI { path: string }
declare interface InptutPathsListI { add: Function; paths: Array<pathI> }
declare interface ListPathsI { list: Array<pathI> }

/* EXTs interfaces */
declare interface ExtI { value: string }
declare interface ExtListI { list: Array<ExtI> }

declare interface OptionsI {
    'delete?': boolean;
    'priorties': boolean;
    'priortiesPath': string;
}
declare interface NavBarStateI {
    "delete?": boolean;
    "priorities?": boolean;
    "prioritiesPath": string;
    "refresh": boolean;
    "paths": { path: string }[];
    "ext": { value: string }[];
}
declare interface InputListExtI { add: Function; ext: [{ value: string }] }
