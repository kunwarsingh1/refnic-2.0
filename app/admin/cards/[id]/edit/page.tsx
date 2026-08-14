import { notFound } from "next/navigation";
import { CardForm } from "@/components/admin/CardForm";
import { getCardById } from "@/lib/content/cards";
import { updateCardAction } from "@/app/actions/cards";

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getCardById(id);
  if (!card) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit card</h1>
      <div className="mt-6">
        <CardForm card={card} action={updateCardAction.bind(null, id)} />
      </div>
    </div>
  );
}
