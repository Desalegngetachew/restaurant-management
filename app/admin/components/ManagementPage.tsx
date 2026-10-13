"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Download, Pencil, Trash2, X } from "lucide-react";

type ManagementPageProps = {
    title: string;
    description: string;
    columns: string[];
    initialRows: string[][];
    addLabel?: string;
};

export default function ManagementPage({
    title,
    description,
    columns,
    initialRows,
    addLabel = "Add new",
}: ManagementPageProps) {
    const [rows, setRows] = useState(initialRows);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [values, setValues] = useState<string[]>(columns.map(() => ""));

    const filteredRows = useMemo(
        () =>
            rows
                .map((row, index) => ({ row, index }))
                .filter(({ row }) =>
                    row.some((value) =>
                        value.toLowerCase().includes(search.toLowerCase()),
                    ),
                ),
        [rows, search],
    );

    function openAdd() {
        setEditingIndex(null);
        setValues(columns.map(() => ""));
        setModalOpen(true);
    }

    function openEdit(index: number) {
        setEditingIndex(index);
        setValues([...rows[index]]);
        setModalOpen(true);
    }

    function saveRow() {
        if (!values[0]?.trim()) return;


        if (editingIndex !== null) {
            setRows((current) =>
                current.map((row, index) =>
                    index === editingIndex ? values : row,
                ),
            );
        } else {
            setRows((current) => [...current, values]);
        }

        setModalOpen(false);


    }

    function deleteRow(index: number) {
        if (window.confirm("Delete this demo record?")) {
            setRows((current) => current.filter((_, i) => i !== index));
        }
    }

    function exportCsv() {
        const content = [columns, ...rows]
            .map((row) =>
                row
                    .map((cell) => `"${cell.replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\r\n");


        const url = URL.createObjectURL(
            new Blob([content], { type: "text/csv;charset=utf-8;" }),
        );
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`;
        anchor.click();
        URL.revokeObjectURL(url);


    }

    return (<div className="space-y-6"> <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"> <div> <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {title} </h1> <p className="mt-2 text-sm text-slate-500">{description}</p> </div>

        <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0EB8BA] px-4 py-3 text-sm font-bold text-white hover:bg-[#0CA5A7]"
        >
            <Plus size={17} /> {addLabel}
        </button>
    </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:px-6">
                <div className="relative w-full sm:max-w-sm">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={`Search ${title.toLowerCase()}...`}
                        className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#0EB8BA] focus:ring-2 focus:ring-teal-100"
                    />
                </div>

                <button
                    onClick={exportCsv}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                    <Download size={16} /> Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            {columns.map((column) => (
                                <th key={column} className="px-5 py-4 font-semibold">
                                    {column}
                                </th>
                            ))}
                            <th className="px-5 py-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredRows.map(({ row, index }) => (
                            <tr key={`${index}-${row[0]}`} className="hover:bg-slate-50/70">
                                {row.map((value, cellIndex) => (
                                    <td
                                        key={`${cellIndex}-${columns[cellIndex]}`}
                                        className={`px-5 py-4 ${cellIndex === 0
                                            ? "font-bold text-slate-800"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        {value || "—"}
                                    </td>
                                ))}
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(index)}
                                            aria-label={`Edit ${row[0]}`}
                                            className="rounded-lg p-2 text-[#6D54A5] hover:bg-violet-50"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteRow(index)}
                                            aria-label={`Delete ${row[0]}`}
                                            className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredRows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-5 py-14 text-center text-sm text-slate-400"
                                >
                                    No records found. Try another search or add a record.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
                {filteredRows.length} record{filteredRows.length === 1 ? "" : "s"} shown · Demo data
            </div>
        </div>

        {modalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">
                            {editingIndex === null ? addLabel : `Edit ${title.toLowerCase()}`}
                        </h2>
                        <button
                            onClick={() => setModalOpen(false)}
                            aria-label="Close dialog"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                        >
                            <X size={19} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {columns.map((column, index) => (
                            <label key={column} className="block">
                                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                                    {column}
                                </span>
                                <input
                                    value={values[index] ?? ""}
                                    onChange={(event) =>
                                        setValues((current) =>
                                            current.map((value, i) =>
                                                i === index ? event.target.value : value,
                                            ),
                                        )
                                    }
                                    placeholder={`Enter ${column.toLowerCase()}`}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#0EB8BA] focus:ring-2 focus:ring-teal-100"
                                />
                            </label>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveRow}
                            className="rounded-xl bg-[#0EB8BA] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0CA5A7]"
                        >
                            Save record
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}
