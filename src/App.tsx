import './App.css';
import '../src/shared/data/datastore.js';
import Table, { type TableColumns } from './shared/components/Table/Table.tsx';
import type { OperatorType, Product } from './shared/types/datastore';
import Filters, {
  type FilterChange,
} from './shared/components/Filters/Filters.tsx';
import { useCallback, useState } from 'react';
import { OPERATOR_HANDLER_BY_TYPE } from './shared/utils/datastore.utils.ts';

function App() {
  const initialProducts: Product[] = window.datastore.getProducts();
  const [items, setItems] = useState<Product[]>(initialProducts);
  const columns: TableColumns = window.datastore
    .getProperties()
    .map(column => ({
      key: column.id.toString(),
      header: column.name,
      content: (item: Product) =>
        item.property_values.find(value => value.property_id === column.id)
          ?.value ?? '---',
    }));

  const properties = window.datastore.getProperties();
  const operators = window.datastore.getOperators();

  const tableNoItemsContent = <h4>No products found matching your criteria</h4>;

  const handleClearFilters = useCallback(() => {}, []);

  const handleChangeFilters = useCallback(
    ({ propertyId, operatorId, searchValue }: FilterChange) => {
      if (!operatorId) {
        setItems(initialProducts);
      } else {
        setItems(
          initialProducts.filter(product => {
            const productValue = product.property_values.find(
              propValue => propValue.property_id.toString() === propertyId,
            )?.value;

            return OPERATOR_HANDLER_BY_TYPE[operatorId as OperatorType](
              searchValue,
              productValue,
            );
          }),
        );
      }
    },
    [initialProducts, setItems],
  );

  return (
    <>
      <Filters
        properties={properties}
        operators={operators}
        handleOnClear={handleClearFilters}
        handleOnChange={handleChangeFilters}
      />
      <Table
        columns={columns}
        items={items}
        noItemsContent={tableNoItemsContent}
      />
    </>
  );
}

export default App;
