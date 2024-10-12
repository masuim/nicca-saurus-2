export const NiccaMessage = ({ className }: { className?: string }) => {
  return (
    <div className={`speech-bubble ${className}`}>
      <p className="text-lg font-bold">今日もやるぞ！</p>
    </div>
  );
};
