type NiccaMessageProps = {
  className?: string;
  message: string;
};

export const NiccaMessage = ({ className, message }: NiccaMessageProps) => {
  return (
    <div className={`speech-bubble flex items-start ${className}`}>
      <p className="truncate text-sm font-bold text-mainColor sm:text-base md:text-lg">{message}</p>
    </div>
  );
};
