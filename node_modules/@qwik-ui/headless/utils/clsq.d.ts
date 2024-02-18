/**
 * Custom version of 'clsx' utility migrated to TypeScript.
 */
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export declare function clsq(...inputs: ClassValue[]): string;
export default clsq;
