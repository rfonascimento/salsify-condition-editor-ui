export const OPERATOR_HANDLER_BY_TYPE = {
    equals: (searchValue, productValue) => !searchValue || productValue?.toString() === searchValue,
    greater_than: (searchValue, productValue) => !searchValue || Number(productValue) > Number(searchValue),
    less_than: (searchValue, productValue) => !searchValue || Number(productValue) < Number(searchValue),
    any: (_, productValue) => productValue != null,
    none: (_, productValue) => productValue == null,
    in: (searchValue, productValue) => {
        const parsedSearchValue = (searchValue ?? '').toString().split(',');
        return (!searchValue ||
            parsedSearchValue.includes((productValue ?? '').toString()));
    },
    contains: (searchValue, productValue) => (productValue ?? '')
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
};
