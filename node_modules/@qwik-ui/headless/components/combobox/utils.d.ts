interface Option {
    key: number;
    disabled: boolean;
}
export declare const getNextEnabledOptionIndex: <O extends Option = Option>(index: number, filteredOptionsSig: {
    value: O[];
}) => number;
export declare const getPrevEnabledOptionIndex: <O extends Option = Option>(index: number, filteredOptionsSig: {
    value: O[];
}) => number;
export declare const getActiveDescendant: <O extends Option = Option>(highlightedIndexSig: {
    value: number;
}, filteredOptionsSig: {
    value: O[];
}, localId: string) => string;
export {};
