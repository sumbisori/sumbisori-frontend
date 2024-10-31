interface Props {
  seafoodName: string;
  isNew: boolean;
  counts: number;
  name: string;
  onClick?: () => void;
}

export const SeafoodCard = (props: Props) => {
  return (
    <div
      className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70"
      onClick={props.onClick}
    >
      <div
        className={
          'relative size-[100px] border border-orange-300 bg-orange-100 bg-cover bg-center bg-no-repeat' +
          (props.counts > 0 ? '' : ' grayscale')
        }
        style={{
          backgroundImage:
            'url(/images/Seafoods/' + props.seafoodName + '.svg)',
        }}
      >
        <div className="absolute bottom-1.5 right-1.5 text-xs font-bold text-orange-900">
          {props.name}
        </div>
        {props.counts > 0 && (
          <div className="absolute left-1 top-1 rounded-xl bg-orange-200 px-2 text-[10px] text-orange-700 hover:bg-orange-300 hover:text-orange-800">
            {props.counts}개
          </div>
        )}
        <div
          className={
            props.isNew
              ? 'relative left-[82px] top-[10px] size-[8px] rounded-full bg-red-500'
              : ''
          }
        ></div>
      </div>
    </div>
  );
};
