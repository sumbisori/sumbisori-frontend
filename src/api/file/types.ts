export interface PresignedUrlRequest {
  fileInfo: PresignedUrlFileInfo[];
}

export interface PresignedUrlFileInfo {
  contentType: string;
  size: number;
}

export interface PresignedUrlResponse {
  url: string;
  objectKey: string;
}
