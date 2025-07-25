import { type FC } from 'react';
import './Filters.css';
type FiltersPropertyType = 'string' | 'number' | 'enumerated';
export type FiltersOperatorsType = 'equals' | 'greater_than' | 'less_than' | 'any' | 'none' | 'in' | 'contains';
interface FiltersProperty {
    id: string | number;
    name: string;
    type: FiltersPropertyType;
    values?: string[];
}
interface FiltersOperators {
    id: string;
    text: string;
}
export interface FilterChange {
    propertyId: string;
    operatorId: string;
    searchValue: string;
}
export interface FiltersProps {
    properties: FiltersProperty[];
    operators: FiltersOperators[];
    handleOnClear: () => void;
    handleOnChange: (change: FilterChange) => void;
}
declare const Filters: FC<FiltersProps>;
export default Filters;
