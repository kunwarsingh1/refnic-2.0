/** Faint circular accent graphic used twice on the Career page. */
export default function CareerDecorativeRing({ className = "" }: { className?: string }) {
  return (
    <div className={`relative opacity-40 ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-white/20" />
      <div className="absolute inset-[12.5%] rounded-full bg-[#F2F2F7]/[0.06]" />
      <div className="absolute left-[34%] top-[31%] h-[9%] w-[9%] rounded-sm bg-[#F2F2F7]/20" />
    </div>
  );
}
