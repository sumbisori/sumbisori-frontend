interface Props {
  place: string | null;
  onPlaceChange: (place: string | null) => void;
}

export const SelectPlace = ({ place, onPlaceChange }: Props) => {
  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">장소</p>
          <p className="text-sm text-gray-600">{place}</p>
        </div>
      </div>
    </div>
  );
};
