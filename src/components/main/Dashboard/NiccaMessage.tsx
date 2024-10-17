export const NiccaMessage = ({ className }: { className?: string }) => {
  return (
    <div className={`speech-bubble flex items-center ${className}`}>
      <p className="text-lg font-bold text-white">今日もやるぞ！頑張ってこなそう！</p>
    </div>
  );
};
