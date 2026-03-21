import {getRequest, patchRequest, postRequest} from "../../../common/request/request.ts";
import {BranchsType, PathPartialType, PathType} from "../../common/types.ts";

export const getOwnerInfos = (url_owner: number) =>
    getRequest<PathType>(`/path-profil/get-full-by-id/${url_owner}`);

export const createPathProfile = (pathCreate: PathPartialType) =>
    postRequest<PathType, PathPartialType>(`/path-profil`, pathCreate);

export const updatePathProfil = (userId: number, pathWithNestedBranchs: PathType) =>
    patchRequest<PathType, PathType>(`/path-profil/${userId}`, pathWithNestedBranchs);

export const updateAllBranchs = (userId: number, pathWithNestedBranchs: PathType) =>
    patchRequest<BranchsType[], PathType>(`/branch-network/all/${userId}`, pathWithNestedBranchs);
