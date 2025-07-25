import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const TableHeader = ({ columns }) => {
    return (_jsx("thead", { children: _jsx("tr", { children: columns.map((column, i) => (_jsx("th", { className: 'text-left', children: column.header }, i))) }) }));
};
// TODO: Remove index from key value
const TableBody = ({ items, columns }) => {
    return (_jsx("tbody", { children: items.map(item => (_jsx("tr", { children: columns.map((column, i) => (_jsx("td", { className: 'text-left', children: column.content(item) }, i))) }, item.id))) }));
};
const Table = ({ columns, items, noItemsContent }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("table", { className: 'table w-full', children: [_jsx(TableHeader, { columns: columns }), _jsx(TableBody, { items: items, columns: columns })] }), !items.length && noItemsContent] }));
};
export default Table;
