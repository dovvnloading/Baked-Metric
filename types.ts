export enum UnitType {
  Volume = 'volume',
  Weight = 'weight',
  Temperature = 'temperature',
}

export interface Ingredient {
  id: string;
  name: string;
  density: number; // grams per ml
  category?: string;
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  toMl?: number; // for volume
  toGrams?: number; // for weight
}

export enum PanShape {
  Round = 'Round',
  Square = 'Square',
  Rectangle = 'Rectangle',
}

export interface PanDimensions {
  shape: PanShape;
  width: number;
  length?: number; // for rectangle
  diameter?: number; // for round
}