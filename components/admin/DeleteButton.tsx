"use client";

export function DeleteButton({ action, label = "Delete" }: { action: () => Promise<unknown>; label?: string }) {
  return (
    <form
      action={async () => {
        await action();
      }}
      onSubmit={(e) => {
        if (!confirm("Delete this item? This cannot be undone.")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-xs font-medium text-red-400 hover:text-red-300">
        {label}
      </button>
    </form>
  );
}
