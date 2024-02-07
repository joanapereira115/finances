import { IRSDef, CalculatedIRS } from '@/app/lib/definitions';

const types = [
  {
    id: 'sol',
    description: 'Solteiro',
  },
];

const youngIRS = [
  { id: 1, percentage: 50, limit: 6002.88 },
  { id: 2, percentage: 40, limit: 4802.3 },
  { id: 3, percentage: 30, limit: 3601.73 },
  { id: 4, percentage: 30, limit: 3601.73 },
  { id: 5, percentage: 20, limit: 2401.15 },
];

const scale = [
  { min: 0, max: 7479, tax: 14.5, parcel: 0 },
  { min: 7480, max: 11284, tax: 21, parcel: 486.14 },
  { min: 11285, max: 15992, tax: 26.5, parcel: 1106.73 },
  { min: 15993, max: 20700, tax: 28.5, parcel: 1426.65 },
  { min: 20701, max: 26355, tax: 35, parcel: 2772.14 },
  { min: 26356, max: 38632, tax: 37, parcel: 3299.12 },
  { min: 38633, max: 50483, tax: 43.5, parcel: 5810.25 },
  { min: 50484, max: 78834, tax: 45, parcel: 6567.33 },
  { min: 78835, max: Infinity, tax: 48, parcel: 8932.68 },
];

let calculateIRS = (irsData: IRSDef) => {
  let rendCol = +irsData.grossIncome - +4104;
  let scaleLine =
    scale.find((item) => +rendCol >= +item.min && +rendCol <= +item.max) ||
    null;
  let tax = +scaleLine.tax;
  let parcel = +scaleLine.parcel;
  let impApur = Number(((+rendCol * +tax) / 100 - +parcel).toFixed(2));
  let impIse = +0;
  if (irsData.youngIrs !== '') {
    let youngLine =
      youngIRS.find((item) => +irsData.youngIrs === +item.id) || null;
    let limit =
      +irsData.grossIncome * +youngLine.percentage < +youngLine.limit
        ? +irsData.grossIncome * +youngLine.percentage
        : +youngLine.limit;
    impIse = Number(((+limit / +rendCol) * +impApur).toFixed(2));
  }
  let colTot = Number((+impApur - +impIse).toFixed(2));
  let IRSpay = Number((+colTot - +irsData.deductions).toFixed(2));
  let IRSreceive = Number((+irsData.withholding - +IRSpay).toFixed(2));

  return {
    rendCol, // Rendimento coletável
    impApur, // Importância apurada
    impIse, // Imposto de rendimentos isentos
    colTot, // Coleta
    IRSpay, // Valor a pagar
    IRSreceive, // Valor a receber
    tax,
    parcel,
  };
};

function LineData({
  title,
  value,
  unit,
}: {
  title: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="m-2 grid w-[40%] grid-cols-[60%_40%] gap-4">
      <div className="text-left">
        <h2 className="">{title}</h2>
      </div>
      <div className="text-right">
        <h2 className="">
          {value}
          {unit}
        </h2>
      </div>
    </div>
  );
}

export default function IRData({ irsData }: { irsData: IRSDef }) {
  let calculatedIRS: CalculatedIRS = calculateIRS(irsData);
  let type = types.find((tp) => tp.id === irsData?.type);
  let title = `Declaração ${type.description}`;

  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <h2 className="m-2 rounded-xl bg-white p-4 text-xl text-lilac-800 drop-shadow-md">
        {calculatedIRS.IRSreceive}€
      </h2>
      <hr className="border-1 m-2 w-[50%]" />
      <h2 className="font-bold">Rendimento coletável</h2>
      <LineData
        title="Rendimento Global"
        value={irsData?.grossIncome}
        unit="€"
      />
      <LineData
        title="Rendimento coletável"
        value={calculatedIRS?.rendCol}
        unit="€"
      />
      <hr className="border-1 m-2 w-[50%]" />
      <h2 className="font-bold">Coleta</h2>
      <LineData
        title="Importância apurada"
        value={calculatedIRS?.impApur}
        unit="€"
      />
      <LineData
        title="Parcela a abater"
        value={calculatedIRS?.parcel}
        unit="€"
      />
      <LineData title="Taxa adicional" value={calculatedIRS?.tax} unit="%" />
      <LineData
        title="Imposto rendimentos isentos"
        value={calculatedIRS?.impIse}
        unit="€"
      />
      <LineData title="Coleta total" value={calculatedIRS?.colTot} unit="€" />
      <LineData title="Deduções" value={irsData?.deductions} unit="€" />
      <LineData
        title="Retenções na fonte"
        value={irsData?.withholding}
        unit="€"
      />
      <hr className="border-1 m-2 w-[50%]" />
      <h2 className="font-bold">Valor a reembolsar/pagar</h2>
      <LineData title="IRS a pagar" value={calculatedIRS?.IRSpay} unit="€" />
      <LineData title="Reembolso" value={calculatedIRS?.IRSreceive} unit="€" />
    </div>
  );
}
