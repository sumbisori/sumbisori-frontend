interface Props {
  seafoodName: string;
  isNew: boolean;
  counts: number;
  name: string;
  onClick?: () => void;
}

export const SeafoodCard = (props: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div
        onClick={props.onClick}
        className={
          'relative size-[6.25rem] border border-orange-300 bg-orange-100 bg-cover bg-center bg-no-repeat' +
          (props.counts > 0 ? '' : ' grayscale')
        }
        style={{
          backgroundImage:
            'url(/src/assets/images/Seafoods/' + props.seafoodName + '.svg)',
        }}
      >
        <div className="absolute bottom-1.5 right-1.5 text-xs font-bold text-orange-900">
          {props.name}
        </div>
        {props.counts > 0 && (
          <div className="absolute left-1 top-1 rounded-xl bg-orange-200 px-2 text-[0.625rem] text-orange-700 hover:bg-orange-300 hover:text-orange-800">
            {props.counts}개
          </div>
        )}
        <div
          className={
            props.isNew
              ? 'relative left-[5.125rem] top-2.5 size-2 rounded-full bg-red-500'
              : ''
          }
        ></div>
      </div>
    </div>
  );
};
