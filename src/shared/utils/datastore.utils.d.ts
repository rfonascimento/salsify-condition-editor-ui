import type { OperatorType } from '../types/datastore';
export declare const OPERATOR_HANDLER_BY_TYPE: {
    [k in OperatorType]: (searchValue: string, productValue?: string | number) => boolean;
};
