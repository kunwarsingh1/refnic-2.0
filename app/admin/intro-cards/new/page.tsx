import { IntroCardForm } from "@/components/admin/IntroCardForm";
import { createIntroCardAction } from "@/app/actions/intro-cards";

export default function NewIntroCardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add intro card</h1>
      <div className="mt-6">
        <IntroCardForm action={createIntroCardAction} />
      </div>
    </div>
  );
}
