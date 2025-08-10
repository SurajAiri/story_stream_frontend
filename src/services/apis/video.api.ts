import api from "./client";
import type {
  CreateVideoRequest,
  CreateVideoResponse,
  GetUserJobsResponse,
  GetJobByIdResponse,
  GetJobStatusResponse,
} from "../../types/video.types";

export const createVideoJob = async (
  body: CreateVideoRequest
): Promise<CreateVideoResponse> => {
  const res = await api.post<CreateVideoResponse>("/video/create", body);
  return res.data;
};

export const getUserJobs = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<GetUserJobsResponse> => {
  const res = await api.get<GetUserJobsResponse>(`/video/`, { params });
  return res.data;
};

export const getJobById = async (id: string): Promise<GetJobByIdResponse> => {
  const res = await api.get<GetJobByIdResponse>(`/video/${id}`);
  return res.data;
};

export const getJobStatus = async (
  id: string
): Promise<GetJobStatusResponse> => {
  const res = await api.get<GetJobStatusResponse>(`/video/${id}/status`);
  return res.data;
};
