import { CardForm } from "@/components/admin/CardForm";
import { createCardAction } from "@/app/actions/cards";

export default function NewCardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add card</h1>
      <div className="mt-6">
        <CardForm action={createCardAction} />
      </div>
    </div>
  );
}
