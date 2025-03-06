import { https } from '../instance';
import { PresignedUrlRequest, PresignedUrlResponse } from './types';
import axios from 'axios';

export const getPresignedUrl = async (
  req: PresignedUrlRequest,
): Promise<PresignedUrlResponse[]> => {
  const response = await https.post('/files/presigned-url', req);
  return response.data;
};

export const putAmazonS3 = async ({
  presignedUrl,
  image,
}: {
  presignedUrl: string;
  image: File;
}) => {
  const response = await axios.put(presignedUrl, image, {
    headers: {
      'Content-Type': image.type,
    },
  });

  return response.data;
};
