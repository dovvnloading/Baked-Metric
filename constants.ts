import { Ingredient, Unit, UnitType, PanShape } from './types';

export const INGREDIENTS: Ingredient[] = [
  // --- Flours, Grains & Starches ---
  { id: 'flour_ap', name: 'All-Purpose Flour', density: 0.53, category: 'Flours, Grains & Starches' }, // ~125g/cup
  { id: 'flour_bread', name: 'Bread Flour', density: 0.54, category: 'Flours, Grains & Starches' }, // ~127g/cup
  { id: 'flour_cake', name: 'Cake Flour', density: 0.48, category: 'Flours, Grains & Starches' }, // ~113g/cup
  { id: 'flour_pastry', name: 'Pastry Flour', density: 0.45, category: 'Flours, Grains & Starches' }, // ~106g/cup
  { id: 'flour_whole', name: 'Whole Wheat Flour', density: 0.53, category: 'Flours, Grains & Starches' }, // ~125g/cup
  { id: 'flour_ww_white', name: 'White Whole Wheat Flour', density: 0.53, category: 'Flours, Grains & Starches' },
  { id: 'flour_self_rising', name: 'Self-Rising Flour', density: 0.53, category: 'Flours, Grains & Starches' },
  { id: 'flour_rye', name: 'Rye Flour (Medium)', density: 0.45, category: 'Flours, Grains & Starches' }, // ~106g/cup
  { id: 'flour_buckwheat', name: 'Buckwheat Flour', density: 0.51, category: 'Flours, Grains & Starches' }, // ~120g/cup
  { id: 'flour_semolina', name: 'Semolina Flour', density: 0.70, category: 'Flours, Grains & Starches' }, // ~165g/cup
  { id: 'flour_rice', name: 'Rice Flour (White)', density: 0.60, category: 'Flours, Grains & Starches' }, // ~142g/cup
  { id: 'flour_almond', name: 'Almond Flour', density: 0.41, category: 'Flours, Grains & Starches' }, // ~96g/cup
  { id: 'meal_almond', name: 'Almond Meal', density: 0.44, category: 'Flours, Grains & Starches' }, // ~105g/cup
  { id: 'flour_coconut', name: 'Coconut Flour', density: 0.54, category: 'Flours, Grains & Starches' }, // ~128g/cup
  { id: 'cornstarch', name: 'Cornstarch', density: 0.54, category: 'Flours, Grains & Starches' }, // ~128g/cup
  { id: 'starch_tapioca', name: 'Tapioca Starch/Flour', density: 0.48, category: 'Flours, Grains & Starches' }, // ~113g/cup
  { id: 'starch_potato', name: 'Potato Starch', density: 0.64, category: 'Flours, Grains & Starches' }, // ~152g/cup
  { id: 'oats_rolled', name: 'Rolled Oats (Old Fashioned)', density: 0.38, category: 'Flours, Grains & Starches' }, // ~90g/cup
  { id: 'oats_quick', name: 'Quick/Instant Oats', density: 0.40, category: 'Flours, Grains & Starches' }, // ~95g/cup
  { id: 'cornmeal', name: 'Cornmeal (Yellow)', density: 0.63, category: 'Flours, Grains & Starches' }, // ~150g/cup

  // --- Sugars & Sweeteners ---
  { id: 'sugar_granulated', name: 'White Granulated Sugar', density: 0.85, category: 'Sugars & Sweeteners' }, // ~200g/cup
  { id: 'sugar_brown_light', name: 'Brown Sugar (Light, Packed)', density: 0.91, category: 'Sugars & Sweeteners' }, // ~215g/cup
  { id: 'sugar_brown_dark', name: 'Brown Sugar (Dark, Packed)', density: 0.93, category: 'Sugars & Sweeteners' }, // ~220g/cup
  { id: 'sugar_powdered', name: 'Powdered Sugar (Unsifted)', density: 0.51, category: 'Sugars & Sweeteners' }, // ~120g/cup
  { id: 'sugar_turbinado', name: 'Turbinado/Raw Sugar', density: 0.89, category: 'Sugars & Sweeteners' }, // ~210g/cup
  { id: 'sugar_pearl', name: 'Pearl/Sanding Sugar', density: 0.80, category: 'Sugars & Sweeteners' },
  { id: 'honey', name: 'Honey', density: 1.42, category: 'Sugars & Sweeteners' }, // ~335g/cup
  { id: 'syrup_maple', name: 'Maple Syrup', density: 1.32, category: 'Sugars & Sweeteners' }, // ~312g/cup
  { id: 'syrup_corn', name: 'Corn Syrup', density: 1.48, category: 'Sugars & Sweeteners' }, // ~350g/cup
  { id: 'molasses', name: 'Molasses', density: 1.40, category: 'Sugars & Sweeteners' }, // ~330g/cup
  { id: 'agave', name: 'Agave Nectar', density: 1.38, category: 'Sugars & Sweeteners' },
  { id: 'glucose', name: 'Glucose Syrup', density: 1.40, category: 'Sugars & Sweeteners' },

  // --- Fats, Oils & Nut Butters ---
  { id: 'butter', name: 'Butter (Unsalted)', density: 0.96, category: 'Fats, Oils & Nut Butters' }, // ~227g/cup
  { id: 'oil_veg', name: 'Vegetable/Canola Oil', density: 0.92, category: 'Fats, Oils & Nut Butters' }, // ~218g/cup
  { id: 'oil_olive', name: 'Olive Oil', density: 0.92, category: 'Fats, Oils & Nut Butters' },
  { id: 'oil_coconut', name: 'Coconut Oil (Solid)', density: 0.92, category: 'Fats, Oils & Nut Butters' },
  { id: 'shortening', name: 'Vegetable Shortening', density: 0.80, category: 'Fats, Oils & Nut Butters' }, // ~190g/cup (approx for cup measure)
  { id: 'lard', name: 'Lard', density: 0.92, category: 'Fats, Oils & Nut Butters' },
  { id: 'ghee', name: 'Ghee', density: 0.90, category: 'Fats, Oils & Nut Butters' },
  { id: 'pb_smooth', name: 'Peanut Butter (Smooth)', density: 1.12, category: 'Fats, Oils & Nut Butters' }, // ~265g/cup
  { id: 'tahini', name: 'Tahini', density: 1.05, category: 'Fats, Oils & Nut Butters' },

  // --- Liquids, Dairy & Eggs ---
  { id: 'water', name: 'Water', density: 1.0, category: 'Liquids, Dairy & Eggs' },
  { id: 'milk_whole', name: 'Milk (Whole)', density: 1.03, category: 'Liquids, Dairy & Eggs' }, // ~244g/cup
  { id: 'buttermilk', name: 'Buttermilk', density: 1.03, category: 'Liquids, Dairy & Eggs' },
  { id: 'cream_heavy', name: 'Heavy Cream', density: 0.99, category: 'Liquids, Dairy & Eggs' }, // ~235g/cup
  { id: 'half_half', name: 'Half-and-Half', density: 1.02, category: 'Liquids, Dairy & Eggs' },
  { id: 'sour_cream', name: 'Sour Cream', density: 1.02, category: 'Liquids, Dairy & Eggs' }, // ~242g/cup
  { id: 'yogurt', name: 'Yogurt (Plain/Greek)', density: 1.03, category: 'Liquids, Dairy & Eggs' },
  { id: 'milk_evap', name: 'Evaporated Milk', density: 1.07, category: 'Liquids, Dairy & Eggs' }, // ~252g/cup
  { id: 'milk_cond', name: 'Sweetened Condensed Milk', density: 1.30, category: 'Liquids, Dairy & Eggs' }, // ~306g/cup
  { id: 'milk_coconut', name: 'Coconut Milk (Canned)', density: 0.96, category: 'Liquids, Dairy & Eggs' }, // ~226g/cup
  { id: 'mascarpone', name: 'Mascarpone', density: 1.01, category: 'Liquids, Dairy & Eggs' },
  { id: 'cream_cheese', name: 'Cream Cheese', density: 0.98, category: 'Liquids, Dairy & Eggs' }, // ~232g/cup
  { id: 'pumpkin', name: 'Pumpkin Puree', density: 1.06, category: 'Liquids, Dairy & Eggs' }, // ~250g/cup
  { id: 'egg_whites', name: 'Egg Whites', density: 1.03, category: 'Liquids, Dairy & Eggs' }, // ~243g/cup
  { id: 'egg_yolks', name: 'Egg Yolks', density: 1.03, category: 'Liquids, Dairy & Eggs' },

  // --- Salts, Leaveners & Spices ---
  { id: 'salt_table', name: 'Table Salt', density: 1.22, category: 'Salts, Leaveners & Spices' }, // ~288g/cup
  { id: 'salt_kosher_diamond', name: 'Kosher Salt (Diamond Crystal)', density: 0.58, category: 'Salts, Leaveners & Spices' }, // ~135g/cup
  { id: 'salt_kosher_morton', name: 'Kosher Salt (Morton)', density: 0.93, category: 'Salts, Leaveners & Spices' }, // ~220g/cup
  { id: 'salt_sea_fine', name: 'Sea Salt (Fine)', density: 1.15, category: 'Salts, Leaveners & Spices' },
  { id: 'salt_maldon', name: 'Sea Salt (Maldon/Flaky)', density: 0.45, category: 'Salts, Leaveners & Spices' },
  { id: 'baking_powder', name: 'Baking Powder', density: 0.90, category: 'Salts, Leaveners & Spices' }, // ~213g/cup
  { id: 'baking_soda', name: 'Baking Soda', density: 0.97, category: 'Salts, Leaveners & Spices' }, // ~230g/cup
  { id: 'cream_tartar', name: 'Cream of Tartar', density: 0.70, category: 'Salts, Leaveners & Spices' },
  { id: 'yeast_instant', name: 'Instant Yeast', density: 0.58, category: 'Salts, Leaveners & Spices' },
  { id: 'yeast_active', name: 'Active Dry Yeast', density: 0.61, category: 'Salts, Leaveners & Spices' },
  { id: 'xanthan', name: 'Xanthan Gum', density: 0.75, category: 'Salts, Leaveners & Spices' },
  { id: 'gelatin', name: 'Gelatin Powder', density: 0.70, category: 'Salts, Leaveners & Spices' },
  { id: 'cinnamon', name: 'Cinnamon (Ground)', density: 0.55, category: 'Salts, Leaveners & Spices' },

  // --- Chocolate, Fruit & Add-ins ---
  { id: 'cocoa', name: 'Cocoa Powder (Unsweetened)', density: 0.38, category: 'Chocolate, Fruit & Add-ins' }, // ~90g/cup
  { id: 'choc_chips', name: 'Chocolate Chips', density: 0.65, category: 'Chocolate, Fruit & Add-ins' }, // ~155g/cup
  { id: 'choc_chunks', name: 'Chocolate Chunks', density: 0.62, category: 'Chocolate, Fruit & Add-ins' },
  { id: 'cocoa_nibs', name: 'Cocoa Nibs', density: 0.60, category: 'Chocolate, Fruit & Add-ins' },
  { id: 'nuts_chopped', name: 'Nuts (Chopped)', density: 0.46, category: 'Chocolate, Fruit & Add-ins' }, // ~109g/cup
  { id: 'almonds_whole', name: 'Almonds (Whole)', density: 0.60, category: 'Chocolate, Fruit & Add-ins' }, // ~140g/cup
  { id: 'fruit_dried', name: 'Dried Cranberries/Raisins', density: 0.63, category: 'Chocolate, Fruit & Add-ins' }, // ~150g/cup
  { id: 'dates', name: 'Dates (Chopped)', density: 0.72, category: 'Chocolate, Fruit & Add-ins' }, // ~170g/cup
  { id: 'crumbs_graham', name: 'Graham Cracker Crumbs', density: 0.42, category: 'Chocolate, Fruit & Add-ins' }, // ~100g/cup
  { id: 'crumbs_oreo', name: 'Oreo/Cookie Crumbs', density: 0.50, category: 'Chocolate, Fruit & Add-ins' },
];

export const UNITS: Unit[] = [
  // Volume
  { id: 'cup_us', name: 'Cup (US)', type: UnitType.Volume, toMl: 236.59 },
  { id: 'tbsp', name: 'Tablespoon', type: UnitType.Volume, toMl: 14.79 },
  { id: 'tsp', name: 'Teaspoon', type: UnitType.Volume, toMl: 4.93 },
  { id: 'ml', name: 'Milliliter', type: UnitType.Volume, toMl: 1 },
  { id: 'l', name: 'Liter', type: UnitType.Volume, toMl: 1000 },
  { id: 'fl_oz', name: 'Fluid Oz (US)', type: UnitType.Volume, toMl: 29.57 },
  { id: 'pint', name: 'Pint (US)', type: UnitType.Volume, toMl: 473.176 },
  { id: 'quart', name: 'Quart (US)', type: UnitType.Volume, toMl: 946.353 },
  { id: 'gallon', name: 'Gallon (US)', type: UnitType.Volume, toMl: 3785.41 },
  
  // Weight
  { id: 'g', name: 'Gram', type: UnitType.Weight, toGrams: 1 },
  { id: 'kg', name: 'Kilogram', type: UnitType.Weight, toGrams: 1000 },
  { id: 'oz', name: 'Ounce', type: UnitType.Weight, toGrams: 28.35 },
  { id: 'lb', name: 'Pound', type: UnitType.Weight, toGrams: 453.59 },
];

export const PAN_SHAPES = [
  PanShape.Round,
  PanShape.Square,
  PanShape.Rectangle,
];