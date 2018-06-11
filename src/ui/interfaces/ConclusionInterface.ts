export default interface ConclusionInterface {
    Time: string;
    Folders: number;
    Files: number;
    Duplicates: object;
    started: TimeRanges;
    finished: TimeRanges;
}