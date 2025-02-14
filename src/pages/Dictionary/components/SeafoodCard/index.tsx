import { IMAGE_PATHS } from '@/constant';

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
      onClick={props.onClick}
      className={clsx(
        'relative flex aspect-square size-full cursor-pointer items-center justify-center border',
        props.counts > 0
          ? 'border-orange-300 bg-orange-100'
          : 'border-gray-300 bg-gray-100',
      )}
    >
      <img
        src={`${IMAGE_PATHS.SEAFOOD}/${props.seafoodName}.svg`}
        alt={props.name}
        className={clsx('size-full', props.counts > 0 ? '' : 'grayscale')}
      />
      <div
        className={clsx(
          'absolute bottom-1 right-1 text-xs font-bold',
          props.counts > 0 ? 'text-orange-900' : 'text-gray-500',
        )}
      >
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
  );
};
