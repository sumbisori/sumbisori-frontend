import { SeafoodCard } from '../../components/SeafoodCard';

export const Dictionary = () => {
  return (
    <div className="overflow-hidden">
      <div className="hide-scroll overflow-auto px-[18px] pb-[18px]">
        <div className="mt-4 grid grid-cols-3 justify-center gap-3 rounded-lg border border-orange-200 bg-white p-3">
          <SeafoodCard seafoodName={'Gastropods'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Oyster'} isNew={false} counts={3} />
          <SeafoodCard seafoodName={'Net'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'SeaSquirt'} isNew={false} counts={5} />
          <SeafoodCard seafoodName={'Octopus'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'WaterBottle'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'SeaMustard'} isNew={false} counts={2} />
          <SeafoodCard seafoodName={'Rope'} isNew={false} counts={10} />
          <SeafoodCard seafoodName={'Omphalius'} isNew={false} counts={20} />
          <SeafoodCard seafoodName={'Vinyl'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Murex'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Conch'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Squid'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Abalone'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'SeaUrchin'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Clam'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'SeaCucumber'} isNew={false} counts={0} />
          <SeafoodCard seafoodName={'Mussel'} isNew={false} counts={0} />
        </div>
      </div>
    </div>
  );
};
