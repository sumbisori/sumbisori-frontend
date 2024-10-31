interface Props {
  seafoodName: string;
  isNew: boolean;
  counts: number;
  onClick?: () => void;
}

export const SeafoodCard = (props: Props) => {
  const suffix = props.counts > 0 ? '-color' : '-black';
  return (
    <div
      className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70"
      onClick={props.onClick}
    >
      <div
        className="relative size-[100px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(/images/SeafoodCard/' + props.seafoodName + suffix + '.svg)',
        }}
      >
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
