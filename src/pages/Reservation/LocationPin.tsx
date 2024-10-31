interface LocationPinProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const LocationPin = ({ x, y, onClick }: LocationPinProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <img src="/icons/location_pin.svg" alt="Pin" />
    </div>
  );
};
