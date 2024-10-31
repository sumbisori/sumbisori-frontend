interface Props {
  seafoodName: string;
  has: boolean;
  isNew: boolean;
}

export const SeafoodCard = (props: Props) => {
  const suffix = props.has ? '-color' : '-black';
  return (
    <div>
      <div
        className="size-[100px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(/images/SeafoodCard/' + props.seafoodName + suffix + '.svg)',
        }}
      >
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
