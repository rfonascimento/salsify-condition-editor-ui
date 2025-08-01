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

interface TableBodyProps<I = any> extends TableHeaderProps {
  items: I[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, i) => (
          <th className={'text-left'} key={i}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TODO: Remove index from key value
const TableBody: FC<TableBodyProps> = ({ items, columns }) => {
  return (
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          {columns.map((column, i) => (
            <td className={'text-left'} key={i}>
              {column.content(item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const Table: FC<TableProps> = ({ columns, items, noItemsContent }) => {
  return (
    <>
      <table className={'table w-full'}>
        <TableHeader columns={columns} />
        <TableBody items={items} columns={columns} />
      </table>
      {!items.length && noItemsContent}
    </>
  );
};

export default Table;
