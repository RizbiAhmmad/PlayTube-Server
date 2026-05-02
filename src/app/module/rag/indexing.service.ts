import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { EmbeddingService } from "./embedding.service";

const toVectorLiteral = (vector: number[]) => `[${vector.join(",")}]`;

export class IndexingService {
  private embeddingService: EmbeddingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }

  async indexDocument(
    chunkKey: string,
    sourceType: string,
    sourceId: string,
    content: string,
    sourceLabel?: string,
    metadata?: Record<string, unknown>,
  ) {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);

      await prisma.$executeRaw(Prisma.sql`
        INSERT INTO "document_embeddings"
        (
          "id",
          "chunkKey",
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metadata",
          "embedding",
          "updatedAt"
        )
        VALUES
        (
          gen_random_uuid(),
          ${chunkKey},
          ${sourceType},
          ${sourceId},
          ${sourceLabel || null},
          ${content},
          ${JSON.stringify(metadata || {})} :: jsonb,
          CAST(${vectorLiteral} AS vector(2048)),
          NOW()
        )
        ON CONFLICT ("chunkKey")
        DO UPDATE SET
          "sourceType" = EXCLUDED."sourceType",
          "sourceId" = EXCLUDED."sourceId",
          "sourceLabel" = EXCLUDED."sourceLabel",
          "content" = EXCLUDED."content",
          "metadata" = EXCLUDED."metadata",
          "embedding" = EXCLUDED."embedding",
          "isDeleted" = false,
          "deletedAt" = null,
          "updatedAt" = NOW()
        `);
    } catch (error) {
      console.log("Error in indexDocument:", error);
      throw error;
    }
  }

  async indexMediaData() {
    try {
      console.log("Fetching media data for indexing....");
      const medias = await prisma.media.findMany({
        include: {
          reviews: true,
        },
      });

      let indexedCount = 0;

      for (const media of medias) {
        // format reviews
        const reviewsText = media.reviews.length > 0 
          ? media.reviews.map((r) => `- Rating: ${r.rating}/5. Comment: ${r.content || "No comment"}`).join("\n")
          : "No reviews yet.";

        const content = `Title: ${media.title}
            Description: ${media.description}
            Type: ${media.type}
            Release Year: ${media.releaseYear}
            Director: ${media.director}
            Cast: ${media.cast.join(", ")}
            Genres: ${media.genres.join(", ")}
            Pricing Type: ${media.pricingType}
            Price: ${media.price ? `$${media.price}` : "N/A"}

            User Reviews:
            ${reviewsText}`;

        const metadata = {
          mediaId: media.id,
          title: media.title,
          type: media.type,
          genres: media.genres,
          releaseYear: media.releaseYear,
          director: media.director,
        };

        const chunkKey = `media-${media.id}`;

        await this.indexDocument(
          chunkKey,
          "MEDIA",
          media.id,
          content,
          media.title,
          metadata,
        );

        indexedCount++;
      }

      console.log(`Successfully Indexed ${indexedCount} media items.`);

      return {
        success: true,
        message: `Successfully Indexed ${indexedCount} media items.`,
        indexedCount,
      };
    } catch (error) {
      console.log("Error in indexMediaData:", error);
      throw error;
    }
  }
}
