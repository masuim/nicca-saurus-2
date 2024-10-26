export const NiccaMessage = ({ className }: { className?: string }) => {
  return (
    <div className={`speech-bubble flex items-start ${className}`}>
      <p className="truncate text-sm font-bold text-mainColor sm:text-base md:text-lg">
        今日もやるぞ！頑張ってこなそう！
      </p>
    </div>
  );
};
