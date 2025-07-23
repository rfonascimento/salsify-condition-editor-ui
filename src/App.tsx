import './App.css';
import '../src/shared/data/datastore.js';
import Table, { type TableColumns } from './shared/components/Table/Table.tsx';
import type { Product } from './shared/types/datastore';

function App() {
  const columns: TableColumns = window.datastore
    .getProperties()
    .map(column => ({
      key: column.id.toString(),
      header: column.name,
      content: (item: Product) =>
        item.property_values.find(value => value.property_id === column.id)
          ?.value ?? '---',
    }));

  const items = window.datastore.getProducts();

  return (
    <>
      <Table columns={columns} items={items} />
    </>
  );
}

export default App;
