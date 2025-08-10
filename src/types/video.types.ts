import type { ApiResponse } from "./api.types";

export type JobStatus =
  | "queued"
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled";

export type JobStep =
  | "creation"
  | "script_refinement"
  | "audio_generation"
  | "transcription"
  | "image_prompting"
  | "image_generation"
  | "project_creation"
  | "asset_preparation"
  | "video_rendering"
  | "audio_stitching"
  | "post_processing"
  | "cleanup"
  | "completed";

export interface VideoJob {
  _id: string;
  job_id: string;
  user_id: string;
  status: JobStatus;
  current_step: JobStep;
  message: string | null;
  result_url: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export type EntryPoint = "script" | "topic";

export interface CreateVideoRequest {
  content: string;
  entry_point?: EntryPoint; // defaults to "topic" server-side
}

export interface CreateVideoData {
  job_id?: string;
  _id?: string; // in case backend proxies DB id too
  message: string;
  status?: JobStatus;
}

export type CreateVideoResponse = ApiResponse<CreateVideoData>;

export type GetUserJobsResponse = ApiResponse<{
  jobs: VideoJob[];
  totalCount: number;
}>;

export type GetJobByIdResponse = ApiResponse<VideoJob>;

export type GetJobStatusResponse = ApiResponse<{
  step: JobStep;
  status: JobStatus;
}>;
