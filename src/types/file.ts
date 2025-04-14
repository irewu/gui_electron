export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  modified: string;
  path: string;
  tags: string[];
  linkedAssetId?: string;
  linkedAssetName?: string;
  thumbnail?: string;
}

export type FileViewMode = 'list' | 'grid';

export type SortField = 'name' | 'modified' | 'size' | 'type';

export type SortDirection = 'asc' | 'desc';

export type FileCategory = 'all' | 'documents' | 'images' | 'videos' | 'others';

export type FileTag = 'important' | 'pending' | 'archived';

export interface FileSort {
  field: SortField;
  direction: SortDirection;
}

export interface FileContextMenuOptions {
  preview: boolean;
  download: boolean;
  rename: boolean;
  moveTo: boolean;
  addTags: boolean;
  delete: boolean;
} 