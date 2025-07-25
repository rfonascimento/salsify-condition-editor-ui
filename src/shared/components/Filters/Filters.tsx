import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import './Filters.css';

type FiltersPropertyType = 'string' | 'number' | 'enumerated';

export type FiltersOperatorsType =
  | 'equals'
  | 'greater_than'
  | 'less_than'
  | 'any'
  | 'none'
  | 'in'
  | 'contains';

const operatorsByPropertyType: {
  [k in FiltersPropertyType]: FiltersOperatorsType[];
} = {
  string: ['equals', 'any', 'none', 'in', 'contains'],
  number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
  enumerated: ['equals', 'any', 'none', 'in'],
};

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

const Filters: FC<FiltersProps> = ({
  properties,
  operators,
  handleOnChange,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const isOperatorDisabled = !selectedProperty;
  const isSearchValueVisible =
    !!selectedOperator &&
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
    const property = properties.find(
      property => property.id.toString() === selectedProperty,
    );

    return operators.filter(prop =>
      operatorsByPropertyType[property!.type].includes(
        prop.id as FiltersOperatorsType,
      ),
    );
  }, [selectedProperty, isOperatorDisabled, operators, properties]);

  const handlePropertyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedProperty(event.target.value);
      setSelectedOperator('');
      setSearchValue('');
    },
    [],
  );

  const handleOperatorChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedOperator(event.target.value);
      setSearchValue('');
    },
    [],
  );

  const handleOnSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [selectedOperator],
  );

  const handleClearFilters = useCallback(() => {
    setSelectedProperty('');
    setSelectedOperator('');
    setSearchValue('');
  }, []);

  const SearchInput = useMemo(() => {
    if (!isSearchValueVisible) {
      return undefined;
    } else {
      const property = properties.find(
        property => property.id.toString() === selectedProperty,
      )!;

      switch (property.type) {
        case 'string': {
          return (
            <input
              id={'FiltersSearchInput'}
              className={'input input-bordered'}
              type={'text'}
              placeholder={'Search ...'}
              value={searchValue}
              onChange={handleOnSearchChange}
            />
          );
        }
        case 'number': {
          return (
            <input
              id={'FiltersSearchInput'}
              className={'input input-bordered'}
              type={'number'}
              placeholder={'Search ...'}
              value={searchValue}
              onChange={handleOnSearchChange}
            />
          );
        }
        // TODO: Support enumerated values use case
        case 'enumerated': {
          return (
            <input
              id={'FiltersSearchInput'}
              className={'input input-bordered'}
              type={'text'}
              placeholder={'Search ...'}
              value={searchValue}
              onChange={handleOnSearchChange}
            />
          );
        }
      }
    }
  }, [isSearchValueVisible, properties, searchValue]);

  return (
    <div className={'filtersContainer'}>
      <select
        className={'select select-bordered w-full max-w-xs'}
        name={'properties'}
        value={selectedProperty}
        onChange={handlePropertyChange}
      >
        <option value={''} disabled>
          Select a property
        </option>
        {properties.map(property => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>

      <select
        className={'select select-bordered w-full max-w-xs'}
        name={'operators'}
        disabled={isOperatorDisabled}
        value={selectedOperator}
        onChange={handleOperatorChange}
      >
        <option value={''} disabled>
          Select an operator
        </option>
        {filteredOperators.map(operator => (
          <option key={operator.id} value={operator.id}>
            {operator.text}
          </option>
        ))}
      </select>

      {isSearchValueVisible && SearchInput}

      <button
        className={'clearButton btn btn-primary'}
        onClick={handleClearFilters}
      >
        Clear
      </button>
    </div>
  );
};

export default Filters;
