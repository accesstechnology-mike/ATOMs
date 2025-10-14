import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { evaluations, evaluationResponses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, clientName, evaluationDate, status, responses } = body;

    // Create evaluation
    const [evaluation] = await db
      .insert(evaluations)
      .values({
        userId,
        clientName,
        evaluationDate: new Date(evaluationDate),
        status,
      })
      .returning();

    // Create responses
    if (responses && responses.length > 0) {
      await db.insert(evaluationResponses).values(
        responses.map((response: any) => ({
          evaluationId: evaluation.id,
          category: response.category,
          sectionName: response.sectionName,
          rating: response.rating,
          notes: response.notes,
          actionRequired: response.actionRequired,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      evaluationId: evaluation.id,
    });
  } catch (error) {
    console.error("Error creating evaluation:", error);
    return NextResponse.json(
      { error: "Failed to create evaluation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { evaluationId, clientName, evaluationDate, status, responses } =
      body;

    // Update evaluation
    await db
      .update(evaluations)
      .set({
        clientName,
        evaluationDate: new Date(evaluationDate),
        status,
        updatedAt: new Date(),
      })
      .where(eq(evaluations.id, evaluationId));

    // Delete existing responses
    await db
      .delete(evaluationResponses)
      .where(eq(evaluationResponses.evaluationId, evaluationId));

    // Create new responses
    if (responses && responses.length > 0) {
      await db.insert(evaluationResponses).values(
        responses.map((response: any) => ({
          evaluationId,
          category: response.category,
          sectionName: response.sectionName,
          rating: response.rating,
          notes: response.notes,
          actionRequired: response.actionRequired,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      evaluationId,
    });
  } catch (error) {
    console.error("Error updating evaluation:", error);
    return NextResponse.json(
      { error: "Failed to update evaluation" },
      { status: 500 }
    );
  }
}

