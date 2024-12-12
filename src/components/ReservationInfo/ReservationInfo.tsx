interface Props {
  imageSrc: string;
  title: string;
  address: string;
  price: number;
}

export const ReservationInfo = ({ imageSrc, title, address, price }: Props) => {
  return (
    <div className="flex gap-2">
      <img src={imageSrc} alt="img" className="size-[4.5rem] rounded-lg" />
      <div className="flex h-[4.5rem] flex-col">
        <p className="text-[1.25rem] font-semibold tracking-tight">{title}</p>
        <p className="truncate text-[0.625rem]">{address}</p>
        <p className="text-[1.063rem] font-bold">{price.toLocaleString()}원</p>
      </div>
    </div>
  );
};
