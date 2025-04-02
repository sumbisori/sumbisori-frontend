import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';

import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';
import { queryKeys } from '@/query';
import { useQuery } from '@tanstack/react-query';
import { getJournalDetail } from '@/api/journalDetail';
import { JournalDetailTitle } from './JournalDetailTitle';
import { JournalDetailImages } from './JournalDetailImages';
import { JournalDetailContent } from './JournalDetailContent';
import { JournalDetailType } from '@/api/journalDetail/types';

export const JournalDetail = () => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const { data: journalDetail } = useQuery<JournalDetailType>({
    queryKey: [queryKeys.journalDetail, journalId],
    queryFn: () => {
      if (!journalId) {
        throw new Error('journalId is required');
      }
      return getJournalDetail(journalId);
    },
    enabled: !!journalId,
  });

  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => navigate(routes.myPage)}
        onRightClick={() => toast.info('준비중입니다.')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="flex flex-1 flex-col">
        {journalDetail && (
          <>
            <JournalDetailTitle
              experienceDate={journalDetail.experienceDate}
              placeName={journalDetail.placeName}
              satisfaction={journalDetail.satisfaction}
            />
            <JournalDetailImages imageUrls={journalDetail.imageUrls} />
            <JournalDetailContent
              impression={journalDetail.impression}
              companion={journalDetail.companion}
              weather={journalDetail.weather}
              experienceDate={journalDetail.experienceDate}
              experienceId={journalDetail.experienceId}
            />
          </>
        )}
      </div>
    </div>
  );
};
