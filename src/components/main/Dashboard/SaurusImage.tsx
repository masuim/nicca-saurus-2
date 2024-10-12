type Props = {
    // TODO: schema作成したらstringではなくなる
  saurusType: string;
  className?: string;
};

export const SaurusImage = ({ saurusType, className }: Props) => {
  // TODO: "1.png"で固定値になっているが動的にする
  const imagePath = `/images/saurus/${saurusType}/${saurusType}1.png`;
  return (
    <div className={`mb-4 ${className}`}>
      <img
        src={imagePath}
        alt={saurusType}
        width={200}
        height={200}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};
