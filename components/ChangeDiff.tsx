function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value, null, 2);
}

function FieldRow({ field, from, to }: { field: string; from: unknown; to: unknown }) {
  const fromStr = formatValue(from);
  const toStr = formatValue(to);
  const multiline = fromStr.includes("\n") || toStr.includes("\n");

  return (
    <div className="border-b border-white/10 py-3 last:border-b-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{field}</p>
      {multiline ? (
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <pre className="overflow-x-auto rounded-md bg-red-500/5 p-2 text-xs text-red-200/80">{fromStr}</pre>
          <pre className="overflow-x-auto rounded-md bg-green-500/5 p-2 text-xs text-green-200/80">{toStr}</pre>
        </div>
      ) : (
        <p className="mt-1 text-sm text-white/80">
          <span className="text-red-300/80 line-through">{fromStr}</span>{" "}
          <span className="text-white/30">→</span> <span className="text-green-300">{toStr}</span>
        </p>
      )}
    </div>
  );
}

function FieldList({ label, data }: { label: string; data: Record<string, unknown> }) {
  const keys = Object.keys(data).filter((k) => k !== "id");
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p>
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        {keys.map((key) => (
          <div key={key} className="border-b border-white/10 py-2 last:border-b-0">
            <p className="text-xs font-medium text-white/40">{key}</p>
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-white/80">{formatValue(data[key])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChangeDiff({
  operation,
  args,
  previousArgs,
}: {
  operation: "create" | "update" | "delete" | "reorder";
  args: unknown;
  previousArgs: unknown;
}) {
  if (operation === "reorder") {
    const direction = (args as { direction?: string } | null)?.direction;
    return (
      <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">
        Move this item {direction === "up" ? "up" : "down"} in its list.
      </p>
    );
  }

  if (operation === "create") {
    return <FieldList label="New item" data={(args as Record<string, unknown>) ?? {}} />;
  }

  if (operation === "delete") {
    return <FieldList label="This will be deleted" data={(previousArgs as Record<string, unknown>) ?? {}} />;
  }

  const from = (previousArgs as Record<string, unknown>) ?? {};
  const to = (args as Record<string, unknown>) ?? {};
  // Only compare fields the update form actually submits — fields present on the
  // live document but absent from `to` (e.g. `order`) aren't being changed at all.
  const keys = Object.keys(to).filter((k) => k !== "id");
  const changedKeys = keys.filter((k) => JSON.stringify(from[k]) !== JSON.stringify(to[k]));

  if (changedKeys.length === 0) {
    return <p className="text-sm text-white/50">No field changes detected.</p>;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      {changedKeys.map((key) => (
        <FieldRow key={key} field={key} from={from[key]} to={to[key]} />
      ))}
    </div>
  );
}
