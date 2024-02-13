import { IRSDef, CalculatedIRS } from '@/app/lib/definitions';
import { scale, youngIRS, types } from '@/app/lib/irsData';

let calculateIRS = (irsData: IRSDef) => {
  let rendCol = +irsData.grossIncome - +4104;
  let scaleLine =
    scale[irsData.year]?.find(
      (item) => +rendCol >= +item.min && +rendCol <= +item.max,
    ) || null;
  let tax = +scaleLine.tax;
  let parcel = +scaleLine.parcel;
  let impApur = Number(((+rendCol * +tax) / 100 - +parcel).toFixed(2));
  let impIse = +0;
  if (irsData.youngIrs !== '') {
    let youngLine =
      youngIRS[irsData.year]?.find((item) => +irsData.youngIrs === +item.id) ||
      null;
    let limit =
      +irsData.grossIncome * +youngLine.percentage < +youngLine.limit
        ? +irsData.grossIncome * +youngLine.percentage
        : +youngLine.limit;
    impIse = Number(((+limit / +rendCol) * +impApur).toFixed(2));
  }
  let colTot = Number((+impApur - +impIse).toFixed(2));
  let IRSpay = Number((+colTot - +irsData.deductions).toFixed(2));
  let IRSreceive = Number((+irsData.withHolding - +IRSpay).toFixed(2));

  return {
    collIncome: rendCol, // Rendimento coletável
    impDetermined: impApur, // Importância apurada
    exemptTax: impIse, // Imposto de rendimentos isentos
    totCollect: colTot, // Coleta
    irsToPay: IRSpay, // Valor a pagar
    irsToReceive: IRSreceive, // Valor a receber
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
        <h2 className="font-light">{title}</h2>
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
    <div className="my-4 flex flex-col items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <h2 className="m-2 rounded-xl bg-white p-4 text-xl text-lilac-800 drop-shadow-md">
        {calculatedIRS.irsToReceive}€
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
        value={calculatedIRS?.collIncome}
        unit="€"
      />
      <hr className="border-1 m-2 w-[50%]" />
      <h2 className="font-bold">Coleta</h2>
      <LineData
        title="Importância apurada"
        value={calculatedIRS?.impDetermined}
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
        value={calculatedIRS?.exemptTax}
        unit="€"
      />
      <LineData
        title="Coleta total"
        value={calculatedIRS?.totCollect}
        unit="€"
      />
      <LineData title="Deduções" value={irsData?.deductions} unit="€" />
      <LineData
        title="Retenções na fonte"
        value={irsData?.withHolding}
        unit="€"
      />
      <hr className="border-1 m-2 w-[50%]" />
      <h2 className="font-bold">Valor a reembolsar/pagar</h2>
      <LineData title="IRS a pagar" value={calculatedIRS?.irsToPay} unit="€" />
      <LineData
        title="Reembolso"
        value={calculatedIRS?.irsToReceive}
        unit="€"
      />
    </div>
  );
}
