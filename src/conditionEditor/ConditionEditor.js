import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Filters, {} from '../shared/components/Filters/Filters.tsx';
import Table, {} from '../shared/components/Table/Table.tsx';
import { useCallback, useState } from 'react';
import { OPERATOR_HANDLER_BY_TYPE } from '../shared/utils/datastore.utils.ts';
import logo from '../assets/logo.svg';
import './ConditionEditor.css';
const ConditionEditor = () => {
    const initialProducts = window.datastore.getProducts();
    const [items, setItems] = useState(initialProducts);
    const columns = window.datastore
        .getProperties()
        .map(column => ({
        key: column.id.toString(),
        header: column.name,
        content: (item) => item.property_values.find(value => value.property_id === column.id)
            ?.value ?? '---',
    }));
    const properties = window.datastore.getProperties();
    const operators = window.datastore.getOperators();
    const tableNoItemsContent = _jsx("h4", { children: "No products found matching your criteria" });
    const handleClearFilters = useCallback(() => { }, []);
    const handleChangeFilters = useCallback(({ propertyId, operatorId, searchValue }) => {
        if (!operatorId) {
            setItems(initialProducts);
        }
        else {
            setItems(initialProducts.filter(product => {
                const productValue = product.property_values.find(propValue => propValue.property_id.toString() === propertyId)?.value;
                return OPERATOR_HANDLER_BY_TYPE[operatorId](searchValue, productValue);
            }));
        }
    }, [initialProducts, setItems]);
    return (_jsxs("div", { className: 'conditionEditorContainer', children: [_jsxs("div", { className: 'header', children: [_jsx("img", { src: logo, alt: 'Logo', className: 'logo' }), _jsx("p", { children: "Salsify - Condition Editor UI" })] }), _jsx(Filters, { properties: properties, operators: operators, handleOnClear: handleClearFilters, handleOnChange: handleChangeFilters }), _jsx(Table, { columns: columns, items: items, noItemsContent: tableNoItemsContent })] }));
};
export default ConditionEditor;
