import { Router } from "express";
import { RagController } from "./rag.controller";

const router = Router();

router.get("/stats", RagController.getStats);

//index media data
router.post("/ingest-media", RagController.ingestMedia);

// query rag
router.post("/query", RagController.queryRag);

export const RagRoutes = router;
