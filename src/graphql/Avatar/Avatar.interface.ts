export interface UploadAvatarResult {
  uploadAvatar: string;
}

export interface UploadAvatarInput {
  id: string;
  avatar: AvatarInput;
}

export interface DeleteAvatarInput {
  id: string;
}

export interface AvatarInput {
  base64: string;
  size: number;
  type: string;
}
