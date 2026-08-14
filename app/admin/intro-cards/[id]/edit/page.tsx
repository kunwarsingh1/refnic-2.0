import { notFound } from "next/navigation";
import { IntroCardForm } from "@/components/admin/IntroCardForm";
import { getIntroCardById } from "@/lib/content/introCards";
import { updateIntroCardAction } from "@/app/actions/intro-cards";

export default async function EditIntroCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getIntroCardById(id);
  if (!card) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit intro card</h1>
      <div className="mt-6">
        <IntroCardForm card={card} action={updateIntroCardAction.bind(null, id)} />
      </div>
    </div>
  );
}
