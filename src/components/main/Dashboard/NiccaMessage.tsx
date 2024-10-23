export const NiccaMessage = ({ className }: { className?: string }) => {
  return (
    <div className={`speech-bubble flex items-start ${className}`}>
      <p className="text-lg font-bold text-mainColor">今日もやるぞ！頑張ってこなそう！</p>
    </div>
  );
};
