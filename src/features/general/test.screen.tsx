import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  googleAuthenticate,
  clearAuthToken,
  getAuthToken,
} from "../../services/apis/auth.api";
import { getApiHealth, getRootHealth } from "../../services/apis/health.api";
import {
  createVideoJob,
  getJobById,
  getJobStatus,
  getUserJobs,
} from "../../services/apis/video.api";

export default function TestScreen() {
  const [idToken, setIdToken] = useState("");
  const [content, setContent] = useState(
    "Create a video about AI trends in 2025"
  );
  const [entryPoint, setEntryPoint] = useState<"topic" | "script">("topic");
  const [jobId, setJobId] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const log = (label: string, data: unknown) => {
    console.log(`[${label}]`, data);
  };

  const onRootHealth = async () => {
    try {
      const res = await getRootHealth();
      log("Root Health", res);
    } catch (e) {
      console.error("Root Health Error", e);
    }
  };

  const onApiHealth = async () => {
    try {
      const res = await getApiHealth();
      log("API Health", res);
    } catch (e) {
      console.error("API Health Error", e);
    }
  };

  const onGoogleAuth = async () => {
    try {
      const res = await googleAuthenticate({ id_token: idToken });
      log("Google Auth", res);
    } catch (e) {
      console.error("Google Auth Error", e);
    }
  };

  const onCreateVideo = async () => {
    try {
      const res = await createVideoJob({ content, entry_point: entryPoint });
      log("Create Video", res);
      // If backend returns MongoDB _id, prefill it for convenience
      const maybeId =
        typeof res?.data === "object" && res?.data && "_id" in res.data
          ? (res.data as { _id?: string })._id
          : undefined;
      if (maybeId) {
        setJobId(maybeId);
        log("Prefilled Job _id from Create", maybeId);
      } else {
        console.warn(
          "Create response did not include a MongoDB _id. Use 'Get Jobs' to fetch _id, then 'Get Job By ID'."
        );
      }
    } catch (e) {
      console.error("Create Video Error", e);
    }
  };

  const onGetJobs = async () => {
    try {
      const res = await getUserJobs({ offset, limit });
      log("Get Jobs", res);
      const firstId = res?.data?.jobs?.[0]?._id;
      if (firstId) {
        setJobId(firstId);
        log("Prefilled Job _id from Get Jobs", firstId);
      }
    } catch (e) {
      console.error("Get Jobs Error", e);
    }
  };

  const onGetJobById = async () => {
    // Pre-flight checks
    const token = getAuthToken();
    if (!token) {
      console.error("No auth token found. Please authenticate first.");
      return;
    }
    if (!jobId.trim()) {
      console.error("No Job ID provided. Please enter a MongoDB _id.");
      return;
    }

    console.log("Debug info:", {
      jobId: jobId.trim(),
      hasToken: !!token,
      tokenLength: token?.length || 0,
    });

    try {
      const res = await getJobById(jobId.trim());
      log("Get Job By ID", res);
    } catch (e) {
      console.error("Get Job By ID Error", e);

      // Enhanced error logging for 403s
      if (e && typeof e === "object" && "response" in e) {
        const axiosError = e as {
          response?: { status?: number; data?: unknown };
          config?: { url?: string; method?: string; headers?: unknown };
        };
        if (axiosError.response?.status === 403) {
          console.error("403 Forbidden Details:", {
            url: axiosError.config?.url,
            method: axiosError.config?.method,
            headers: axiosError.config?.headers,
            jobId: jobId.trim(),
            responseData: axiosError.response?.data,
          });
          console.error(
            "Possible causes: 1) Job doesn't belong to your user, 2) Invalid MongoDB _id format, 3) Expired/invalid token"
          );
        }
      }
    }
  };

  const onGetJobStatus = async () => {
    // Pre-flight checks
    const token = getAuthToken();
    if (!token) {
      console.error("No auth token found. Please authenticate first.");
      return;
    }
    if (!jobId.trim()) {
      console.error("No Job ID provided. Please enter a MongoDB _id.");
      return;
    }

    try {
      const res = await getJobStatus(jobId.trim());
      log("Get Job Status", res);
    } catch (e) {
      console.error("Get Job Status Error", e);

      // Enhanced error logging for 403s
      if (e && typeof e === "object" && "response" in e) {
        const axiosError = e as {
          response?: { status?: number; data?: unknown };
          config?: { url?: string; method?: string; headers?: unknown };
        };
        if (axiosError.response?.status === 403) {
          console.error("403 Forbidden Details:", {
            url: axiosError.config?.url,
            method: axiosError.config?.method,
            headers: axiosError.config?.headers,
            jobId: jobId.trim(),
            responseData: axiosError.response?.data,
          });
          console.error(
            "Possible causes: 1) Job doesn't belong to your user, 2) Invalid MongoDB _id format, 3) Expired/invalid token"
          );
        }
      }
    }
  };

  const onShowToken = () => {
    log("Access Token", getAuthToken());
  };

  const onClearToken = () => {
    clearAuthToken();
    log("Access Token Cleared", true);
  };

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>API Test Screen</h1>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Health</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="secondary" size="lg" onClick={onRootHealth}>
            Ping Root Health (GET /)
          </Button>
          <Button variant="default" size="lg" onClick={onApiHealth}>
            Ping API Health (GET /api/v1/)
          </Button>
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Auth</h2>
        <input
          placeholder="Google id_token"
          value={idToken}
          onChange={(e) => setIdToken(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="default" size="lg" onClick={onGoogleAuth}>
            Google Auth
          </Button>
          <Button variant="outline" size="lg" onClick={onShowToken}>
            Show Token
          </Button>
          <Button variant="destructive" size="lg" onClick={onClearToken}>
            Clear Token
          </Button>
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Video</h2>
        <label style={{ display: "grid", gap: 8 }}>
          <span>Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 8, minHeight: 80 }}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span>Entry Point</span>
          <select
            value={entryPoint}
            onChange={(e) =>
              setEntryPoint(e.target.value as "topic" | "script")
            }
            style={{ width: 200, padding: 8 }}
          >
            <option value="topic">topic</option>
            <option value="script">script</option>
          </select>
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="default" size="lg" onClick={onCreateVideo}>
            Create Video Job
          </Button>
        </div>

        <label style={{ display: "grid", gap: 8 }}>
          <span>Job MongoDB ID</span>
          <input
            placeholder="_id"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            style={{ width: 400, padding: 8 }}
          />
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="secondary" size="lg" onClick={onGetJobById}>
            Get Job By ID
          </Button>
          <Button variant="outline" size="lg" onClick={onGetJobStatus}>
            Get Job Status
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>
            Offset:
            <input
              type="number"
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
              style={{ width: 100, marginLeft: 8, padding: 6 }}
            />
          </label>
          <label>
            Limit:
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              style={{ width: 100, marginLeft: 8, padding: 6 }}
            />
          </label>
          <Button variant="ghost" size="lg" onClick={onGetJobs}>
            Get Jobs
          </Button>
        </div>
      </section>
    </div>
  );
}
