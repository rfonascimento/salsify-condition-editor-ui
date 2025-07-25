import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState, } from 'react';
import './Filters.css';
const operatorsByPropertyType = {
    string: ['equals', 'any', 'none', 'in', 'contains'],
    number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
    enumerated: ['equals', 'any', 'none', 'in'],
};
const Filters = ({ properties, operators, handleOnChange, }) => {
    const [selectedProperty, setSelectedProperty] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const isOperatorDisabled = !selectedProperty;
    const isSearchValueVisible = !!selectedOperator &&
        selectedOperator !== 'any' &&
        selectedOperator !== 'none';
    useEffect(() => {
        handleOnChange({
            propertyId: selectedProperty,
            operatorId: selectedOperator,
            searchValue: searchValue.trim().replace(' ', ''),
        });
    }, [selectedProperty, selectedOperator, searchValue]);
    const filteredOperators = useMemo(() => {
        if (isOperatorDisabled) {
            return [];
        }
        const property = properties.find(property => property.id.toString() === selectedProperty);
        return operators.filter(prop => operatorsByPropertyType[property.type].includes(prop.id));
    }, [selectedProperty, isOperatorDisabled, operators, properties]);
    const handlePropertyChange = useCallback((event) => {
        setSelectedProperty(event.target.value);
        setSelectedOperator('');
        setSearchValue('');
    }, []);
    const handleOperatorChange = useCallback((event) => {
        setSelectedOperator(event.target.value);
        setSearchValue('');
    }, []);
    const handleOnSearchChange = useCallback((event) => {
        setSearchValue(event.target.value);
    }, [selectedOperator]);
    const handleClearFilters = useCallback(() => {
        setSelectedProperty('');
        setSelectedOperator('');
        setSearchValue('');
    }, []);
    const SearchInput = useMemo(() => {
        if (!isSearchValueVisible) {
            return undefined;
        }
        else {
            const property = properties.find(property => property.id.toString() === selectedProperty);
            switch (property.type) {
                case 'string': {
                    return (_jsx("input", { id: 'FiltersSearchInput', className: 'input input-bordered', type: 'text', placeholder: 'Search ...', value: searchValue, onChange: handleOnSearchChange }));
                }
                case 'number': {
                    return (_jsx("input", { id: 'FiltersSearchInput', className: 'input input-bordered', type: 'number', placeholder: 'Search ...', value: searchValue, onChange: handleOnSearchChange }));
                }
                // TODO: Support enumerated values use case
                case 'enumerated': {
                    return (_jsx("input", { id: 'FiltersSearchInput', className: 'input input-bordered', type: 'text', placeholder: 'Search ...', value: searchValue, onChange: handleOnSearchChange }));
                }
            }
        }
    }, [isSearchValueVisible, properties, searchValue]);
    return (_jsxs("div", { className: 'filtersContainer', children: [_jsxs("select", { className: 'select select-bordered w-full max-w-xs', name: 'properties', value: selectedProperty, onChange: handlePropertyChange, children: [_jsx("option", { value: '', disabled: true, children: "Select a property" }), properties.map(property => (_jsx("option", { value: property.id, children: property.name }, property.id)))] }), _jsxs("select", { className: 'select select-bordered w-full max-w-xs', name: 'operators', disabled: isOperatorDisabled, value: selectedOperator, onChange: handleOperatorChange, children: [_jsx("option", { value: '', disabled: true, children: "Select an operator" }), filteredOperators.map(operator => (_jsx("option", { value: operator.id, children: operator.text }, operator.id)))] }), isSearchValueVisible && SearchInput, _jsx("button", { className: 'clearButton btn btn-primary', onClick: handleClearFilters, children: "Clear" })] }));
};
export default Filters;
