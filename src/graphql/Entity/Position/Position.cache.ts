import { CacheUpdaterFunction } from "src/types";
import { DeleteEntityEntryInput } from "../Entity.interface";
import {
  CreatePositionInput,
  CreatePositionOutput,
  DeletePositionOutput,
  GetPositionsData,
  UpdatePositionInput,
  UpdatePositionResult,
} from "./Position.interface";
import { GET_POSITIONS } from "./Position.queries";

export const deletePositionCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<DeletePositionOutput, DeleteEntityEntryInput> =>
  (cache, { data }) => {
    const existingPositions = cache.readQuery<GetPositionsData>({
      query: GET_POSITIONS,
    });

    if (existingPositions && data?.deletePosition.affected) {
      cache.writeQuery({
        query: GET_POSITIONS,
        data: {
          positions: existingPositions.positions.filter(
            (entry) => entry.id !== id,
          ),
        },
      });
    }
  };

export const createPositionCacheUpdate =
  (): CacheUpdaterFunction<CreatePositionOutput, CreatePositionInput> =>
  (cache, { data }) => {
    const existingPositions = cache.readQuery<GetPositionsData>({
      query: GET_POSITIONS,
    });

    if (existingPositions) {
      cache.writeQuery({
        query: GET_POSITIONS,
        data: {
          positions: [data?.createPosition, ...existingPositions.positions],
        },
      });
    }
  };

export const positionCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<UpdatePositionResult, UpdatePositionInput> =>
  (cache, { data }) => {
    const existingPositions = cache.readQuery<GetPositionsData>({
      query: GET_POSITIONS,
    });

    if (existingPositions) {
      cache.writeQuery({
        query: GET_POSITIONS,
        data: {
          positions: [
            ...existingPositions.positions.filter(
              (position) => position.id !== id,
            ),
            data?.updatePosition,
          ],
        },
      });
    }
  };
