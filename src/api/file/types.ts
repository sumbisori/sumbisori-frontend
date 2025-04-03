export interface PresignedUrlRequest {
  fileInfos: PresignedUrlFileInfo[];
}

export interface PresignedUrlFileInfo {
  contentType: string;
  size: number;
}

export interface PresignedUrlResponse {
  url: string;
  imageIdentifier: string;
}
