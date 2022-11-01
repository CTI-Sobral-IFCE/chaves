import React from 'react';
import Chart from 'react-google-charts';
import Panel from '@/Components/Dashboard/Panel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/inertia-react';
import moment from 'moment';
import 'tw-elements';

export default function Dashboard({ borrows, can, countRooms, countKeys, countBlocks, countEmployees, countBorrows, dataBorrow }) {
    console.log(dataBorrow);

    const status = (created_at, devolution) => {
        let start = moment(created_at, "DD/MM/YYYY hh:mm:ss");
        let end = moment(created_at, "DD/MM/YYYY hh:mm:ss").add(1, 'd');
        let now = moment();


        if (devolution)
            return <span className="px-2 py-1 text-xs text-white rounded-lg bg-green">Devolvido</span>

        if (now.isBetween(start, end) && !devolution)
            return <span className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-lg">Aberto</span>

        if (now.isAfter(end) && !devolution)
            return <span className="px-2 py-1 text-xs text-white bg-red-500 rounded-lg">Atrasado</span>
    }

    const list = borrows.map((item, i) => {
        return (
            <tr className="transition border-t hover:bg-neutral-100" key={'list' + i}>
                <td className="font-light p-1.5">
                    <Link href={can.borrowView? route('borrows.show', item.id): route('borrows.index', {term: term, page: currentPage})}>{item.created_at}</Link>
                </td>
                <td className="font-light p-1.5">
                    <Link href={can.borrowView? route('borrows.show', item.id): route('borrows.index', {term: term, page: currentPage})}>{item.employee.name}</Link>
                </td>
                <td className="font-light p-1.5"><Link href={can.borrowView? route('borrows.show', item.id): route('borrows.index', {term: term, page: currentPage})}>{status(item.created_at, item.devolution)}</Link></td>
                <td className="flex justify-end p-1.5 text-neutral-400">
                    <Link href={can.borrowView? route('borrows.show', item.id): route('borrows.index', {term: term, page: currentPage})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </Link>
                </td>
            </tr>
        )
    });

    return (
        <>
            <AuthenticatedLayout breadcrumbs={[{label: 'Minha Página', url: route('admin')}]}>
                <div className="grid grid-cols-5 gap-4">
                    <div className="p-2 text-center text-white transition rounded-lg shadow-md bg-emerald-500 hover:bg-emerald-600">
                        <div className="text-xs font-bold tracking-widest uppercase">Total de Salas</div>
                        <div className="text-4xl font-bold">{countRooms}</div>
                    </div>
                    <div className="p-2 text-center text-white transition bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500">
                        <div className="text-xs font-bold tracking-widest uppercase">Total de Blocos</div>
                        <div className="text-4xl font-bold">{countBlocks}</div>
                    </div>
                    <div className="p-2 text-center text-white transition bg-teal-500 rounded-lg shadow-md hover:bg-teal-600">
                        <div className="text-xs font-bold tracking-widest uppercase">Total de Chaves</div>
                        <div className="text-4xl font-bold">{countKeys}</div>
                    </div>
                    <div className="p-2 text-center text-white transition rounded-lg shadow-md bg-amber-400 hover:bg-amber-500">
                        <div className="text-xs font-bold tracking-widest uppercase">Total de Servidores</div>
                        <div className="text-4xl font-bold">{countEmployees}</div>
                    </div>
                    <div className="p-2 text-center text-white transition rounded-lg shadow-md bg-sky-500 hover:bg-sky-600">
                        <div className="text-xs font-bold tracking-widest uppercase">Total de Empréstimos</div>
                        <div className="text-4xl font-bold">{countBorrows}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Panel className={'flex-1 h-96'}>
                        <Chart
                            chartType='Bar'
                            data={dataBorrow}
                            width={'100%'}
                            height={'100%'}
                            options={{
                                chart: {
                                    title: "Empréstimos",
                                    subtitle: 'últimos 7 dias'
                                }
                            }}
                        />
                    </Panel>
                    <Panel className={'flex-1 h-96'}>
                        <h1>Gráfico 2</h1>
                        <div id="chart2"></div>
                    </Panel>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Panel className={'col-span-2 min-h-52'}>
                        <h1>Últimos empréstimos</h1>
                        <table className="table w-full table-auto">
                            <thead>
                                <tr className="border-b">
                                    <th className="font-semibold text-left px-1.5 pt-1.5">Data</th>
                                    <th className="font-semibold text-left px-1.5 pt-1.5">Servidor</th>
                                    <th className="font-semibold text-left px-1.5 pt-1.5">Situação</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </table>
                    </Panel>
                    <Panel>
                        <h1>Atualizações</h1>
                    </Panel>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
