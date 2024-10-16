type Props = {
  // TODO: schema作成したらstringではなくなる
  saurusType: string;
  className?: string;
};

export const SaurusImage = ({ saurusType, className }: Props) => {
  const imagePath = `/images/saurus/${saurusType}/${saurusType}1.png`;
  return (
    <div className={`${className} relative overflow-hidden`} style={{ paddingTop: '100%' }}>
      <img
        src={imagePath}
        alt={saurusType}
        className="absolute inset-0 h-full w-full rounded-lg object-cover hover:shadow-lg"
      />
    </div>
  );
};
