interface PropsHeader {
  saldo: number;
  gastos: number;
  total: number;
}

export default function Header({ saldo, gastos, total }: PropsHeader) {
  return (
    <>
      <header className="h-64 flex flex-col items-center justify-end overflow-hidden">
        <div className="absolute bg-slate-700 h-40 inset-0"></div>

        <section className="relative flex w-3/4 h-48 border-2 bg-white rounded-3xl font-mono">
          <div className="flex-1 border-r border-slate-300 p-6">
            <h1 className="text-2xl pb-8">Saldo</h1>
            <h4 className="text-5xl">R$ {saldo}</h4>
          </div>
          <div className="flex-1 border-r border-slate-300 p-6">
            <h1 className="text-2xl pb-8">Saídas</h1>
            <h4 className="text-5xl">R$ {gastos}</h4>
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-2xl pb-8">Total</h1>
            <h4 className="text-5xl">R$ {total}</h4>
          </div>
        </section>
      </header>
    </>
  );
}
