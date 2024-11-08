interface Props {
  imageSrc: string;
  title: string;
  address: string;
  price: number;
}

export const ReservationInfo = ({ imageSrc, title, address, price }: Props) => {
  return (
    <div className="flex gap-2">
      <img src={imageSrc} alt="img" className="size-[72px] rounded-lg" />
      <div className="flex h-[72px] flex-col">
        <p className="text-[20px] font-semibold tracking-tight">{title}</p>
        <p className="text-[10px]">{address}</p>
        <p className="text-[17px] font-bold">{price.toLocaleString()}원</p>
      </div>
    </div>
  );
};
