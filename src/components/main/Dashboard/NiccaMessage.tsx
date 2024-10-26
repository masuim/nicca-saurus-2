type NiccaMessageProps = {
  className?: string;
  message: string;
};

export const NiccaMessage = ({ className, message }: NiccaMessageProps) => {
  return (
    <div className={`speech-bubble flex items-start ${className}`}>
      <p className="line-clamp-2 text-[0.65rem] font-medium text-mainColor sm:text-xs md:text-sm lg:text-xs xl:text-sm">
        {message}
      </p>
    </div>
  );
};
