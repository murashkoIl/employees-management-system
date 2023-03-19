import { DeleteResult } from "@graphql/delete.types";

export interface GetPositionsData {
  positions: Position[];
}

export interface Position {
  id: string;
  name: string;
}

export interface UpdatePositionInput {
  id: string;
  position: Pick<Position, "name">;
}

export interface DeletePositionOutput {
  deletePosition: DeleteResult;
}

export interface PositionsNamesIdsData {
  positions: PositionNamesIds[];
}

export interface PositionNamesIds {
  id: string;
  name: string;
}

export interface UpdatePositionResult {
  updatePosition: Position;
}

export interface CreatePositionInput {
  position: Pick<Position, "name">;
}

export interface CreatePositionOutput {
  createPosition: {
    position: Position;
    affected: number;
  };
}
