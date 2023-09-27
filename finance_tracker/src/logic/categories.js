const accountCategories = [
  { id: "card", description: "Cartão" },
  { id: "money", description: "Dinheiro" },
  { id: "savings", description: "Poupança" },
  { id: "meal", description: "Cartão Alimentação" },
  { id: "investment", description: "Depósito a Prazo" }
];

const irsCategories = [
  {
    id: "DG",
    name: "Despesas Gerais",
    iva: false,
    percentage: "35",
    max: "250",
  },
  { id: "SD", name: "Saúde", iva: false, percentage: "15", max: "1000" },
  { id: "ED", name: "Educação", iva: false, percentage: "30", max: "800" },
  { id: "HB", name: "Habitação", iva: false, percentage: "15", max: "502" },
  { id: "LR", name: "Lares", iva: false, percentage: "25", max: "403,75" },
  {
    id: "RP",
    name: "Reparação de Automóveis",
    iva: true,
    percentage: "15",
    max: "",
  },
  {
    id: "RM",
    name: "Reparação de Motociclos",
    iva: true,
    percentage: "15",
    max: "",
  },
  {
    id: "RA",
    name: "Restauração e Alojamento",
    iva: true,
    percentage: "15",
    max: "",
  },
  { id: "CB", name: "Cabeleireiros", iva: true, percentage: "15", max: "" },
  {
    id: "AV",
    name: "Atividades Veterinárias",
    iva: true,
    percentage: "15",
    max: "",
  },
  {
    id: "PM",
    name: "Passes Mensais",
    iva: true,
    percentage: "100",
    max: "250",
  },
  { id: "GN", name: "Ginásios", iva: true, percentage: "15", max: "" },
];

const expenseCategories = [
  { id: "SUPE", name: "Supermercado", irsCategory: "DG" },
  { id: "COMB", name: "Combustível", irsCategory: "DG" },
  { id: "MODA", name: "Moda", irsCategory: "DG" },
  { id: "CONT", name: "Contas", irsCategory: "DG" },
  { id: "DECO", name: "Decoração", irsCategory: "DG" },
  { id: "TECN", name: "Tecnologia", irsCategory: "DG" },
  { id: "ESTA", name: "Estacionamento", irsCategory: "DG" },
  { id: "BAR", name: "Bar", irsCategory: "DG" },
  { id: "CAFE", name: "Café", irsCategory: "DG" },
  { id: "ENTR", name: "Entretenimento", irsCategory: "DG" },
  { id: "OUTR", name: "Outros", irsCategory: "DG" },
  { id: "HOSP", name: "Hospital", irsCategory: "SD" },
  { id: "FARM", name: "Farmácia", irsCategory: "SD" },
  { id: "DENT", name: "Dentista", irsCategory: "SD" },
  { id: "EDUC", name: "Educação", irsCategory: "ED" },
  { id: "REND", name: "Renda", irsCategory: "HB" },
  { id: "AUTO", name: "Automóvel", irsCategory: "RP" },
  { id: "REST", name: "Restauração", irsCategory: "RA" },
  { id: "ALOJ", name: "Alojamento", irsCategory: "RA" },
  { id: "CABE", name: "Cabeleireiros", irsCategory: "CB" },
  { id: "DEPI", name: "Depilação", irsCategory: "CB" },
  { id: "VETE", name: "Veterinário", irsCategory: "AV" },
  { id: "PASS", name: "Passe", irsCategory: "PM" },
  { id: "GINA", name: "Ginásio", irsCategory: "GN" },
];

export { accountCategories, irsCategories, expenseCategories };
