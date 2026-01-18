export interface ObjectType {
  id: number;
  labels: string[];
  name: string;
  properties: PropertiesType;
}

interface PropertiesType {
  customer: string;
  due_date: string;
  item: string;
  item_count: string;
  order_id: string;
  priority: string;
  status: string;
  zone: string;
}

export interface PositionsType {
  a: number;
  altitude: number;
  b: number;
  battery: {
    percentage: number;
    percentage_last_update: string;
  };
  c: number;
  flags: [];
  is_valid: boolean;
  latitude: number;
  longitude: number;
  object_id: number;
  source_id: number;
  tag_id: string;
  tenant_id: number;
  timestamp: string;
  x: number;
  y: number;
  z: number;
}

export interface MergedObject extends ObjectType {
  x: number;
  y: number;
  angle: number;
}
