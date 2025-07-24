// datastore.d.ts

export type PropertyValue = {
  property_id: number;
  value: string | number;
};

export type Product = {
  id: number;
  property_values: PropertyValue[];
};

export type PropertyType = 'string' | 'number' | 'enumerated';

export type OperatorType =
  | 'equals'
  | 'greater_than'
  | 'less_than'
  | 'any'
  | 'none'
  | 'in'
  | 'contains';

export type Property = {
  id: number;
  name: string;
  type: PropertyType;
  values?: string[]; // only present if type === 'enumerated'
};

export type Operator = {
  text: string;
  id: string;
};

export type DataStore = {
  getProducts: () => Product[];
  getProperties: () => Property[];
  getOperators: () => Operator[];
  products: Product[];
  properties: Property[];
  operators: Operator[];
};

// Add datastore to the global Window object
declare global {
  interface Window {
    datastore: DataStore;
  }
}
