type Props = {
  className?: string;
}

export const AchievementMetrics = ({ className }: Props) => {
  return (
    <div className={`flex justify-center border-2 rounded-lg border-mainColor px-6 py-8 transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="text-sm text-mainColor">
        連続 <span className="text-blue-500 font-extrabold text-lg">8</span> 回目標達成中！
      </div>
    </div>
  );
};
