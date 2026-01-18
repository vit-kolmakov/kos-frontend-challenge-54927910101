export interface ObjectType {
  id: number;
  labels: string[];
  name: string;
  properties: ContainerProperties | ToolProperties | OrderProperties;
}

interface ContainerProperties {
  capacity: string;
  fill_level: string;
  material_type: string;
  status: string;
  temperature: string;
  zone: string;
}

interface ToolProperties {
  tool_type: string;
  max_load: string;
  operator: string;
  maintenance_due: string;
  usage_hours: string;
  status: string;
  zone: string;
}

interface OrderProperties {
  customer: string;
  due_date: string;
  item_count: string;
  order_id: string;
  priority: "low" | "medium" | "urgent";
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

export interface MergedObject extends ObjectType, Partial<PositionsType> {
  x: number;
  y: number;
  angle: number;
}
