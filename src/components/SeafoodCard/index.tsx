type Props = {
  name: string;
  has: boolean;
};

export const SeafoodCard = (props: Props) => {
  const suffix = props.has ? '-color' : '-black';
  return (
    <div className="">
      <div
        className="size-[100px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(/images/SeafoodCard/' + props.name + suffix + '.svg)',
        }}
      />
      {props.name}
    </div>
  );
};
