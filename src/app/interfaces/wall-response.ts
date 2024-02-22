import { Wall } from './wall';

export interface WallResponse {
  currentPage: number;
  limit: number;
  totalPages: number;
  walls: Wall[];
}
