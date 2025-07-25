import type { FC, ReactNode } from 'react';
interface TableProps<I = any> {
    columns: TableColumns<I>;
    items: I[];
    noItemsContent?: ReactNode | string;
}
interface TableColumn<I = any> {
    key: string;
    header: ReactNode;
    content: (item: I) => ReactNode;
}
export type TableColumns<I = any> = TableColumn<I>[];
export interface TableHeaderProps {
    columns: TableColumns;
}
declare const Table: FC<TableProps>;
export default Table;
