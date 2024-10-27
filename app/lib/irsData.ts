const specificDeduction = {
  2024: 4104,
  2025: 4350.24
}

const youngIRS = {
  2024: [
    { id: 1, percentage: 50, limit: 6002.88, description: '1º Ano' },
    { id: 2, percentage: 40, limit: 4802.3, description: '2º Ano' },
    { id: 3, percentage: 30, limit: 3601.73, description: '3º Ano' },
    { id: 4, percentage: 30, limit: 3601.73, description: '4º Ano' },
    { id: 5, percentage: 20, limit: 2401.15, description: '5º Ano' },
  ],
  2025: [
    { id: 1, percentage: 100, limit: 20370.4, description: '1º Ano' },
    { id: 2, percentage: 75, limit: 15277.8, description: '2º Ano' },
    { id: 3, percentage: 50, limit: 10185.2, description: '3º Ano' },
    { id: 4, percentage: 50, limit: 10185.2, description: '4º Ano' },
    { id: 5, percentage: 25, limit: 5092.6, description: '5º Ano' },
  ],
};

const scale = {
  2024: [
    { min: 0, max: 7479, tax: 14.5, parcel: 0 },
    { min: 7480, max: 11284, tax: 21, parcel: 486.14 },
    { min: 11285, max: 15992, tax: 26.5, parcel: 1106.73 },
    { min: 15993, max: 20700, tax: 28.5, parcel: 1426.65 },
    { min: 20701, max: 26355, tax: 35, parcel: 2772.14 },
    { min: 26356, max: 38632, tax: 37, parcel: 3299.12 },
    { min: 38633, max: 50483, tax: 43.5, parcel: 5810.25 },
    { min: 50484, max: 78834, tax: 45, parcel: 6567.33 },
    { min: 78835, max: Infinity, tax: 48, parcel: 8932.68 },
  ],
  2025: [
    { min: 0, max: 7703, tax: 13, parcel: 0 },
    { min: 7704, max: 11623, tax: 16.5, parcel: 269.61 },
    { min: 11624, max: 16472, tax: 22, parcel: 908.87 },
    { min: 16473, max: 21321, tax: 25, parcel: 1403.03 },
    { min: 21322, max: 27146, tax: 32, parcel: 2895.50 },
    { min: 27147, max: 39791, tax: 35.5, parcel: 3845.61 },
    { min: 39792, max: 43000, tax: 43.5, parcel: 7028.89 },
    { min: 43001, max: 80000, tax: 45, parcel: 7674.07 },
    { min: 80001, max: Infinity, tax: 48, parcel: 10074.34 },
  ],
};

const types = [
  {
    id: 'sol',
    description: 'Solteiro',
  },
];

export { scale, youngIRS, types, specificDeduction };
