import './App.css';
import '../src/shared/data/datastore.js';

function App() {
  const sortedTableHeaders = window.datastore.getProperties();
  const tableRows = window.datastore.getProducts().map(product => {
    const rowCells = sortedTableHeaders.map(prop =>
      product.property_values.find(
        propValues => propValues.property_id === prop.id,
      ),
    );

    return {
      id: product.id,
      cells: rowCells,
    };
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            {sortedTableHeaders.map(prop => (
              <th key={prop.id}>{prop.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(prop => (
            <tr key={prop.id}>
              {prop.cells.map(cell => (
                <td>{cell?.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
