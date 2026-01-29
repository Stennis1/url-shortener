import { prisma } from "../config/prisma";

export type UrlRecord = {
  id: number;
  shortCode: string;
  longUrl: string;
  createdAt: Date;
  expiresAt?: Date | null;
  clickCount: number;
};

export async function createUrl(
  longUrl: string,
  shortCode: string,
  userId?: number
): Promise<UrlRecord> {
  return prisma.url.create({
    data: {
      longUrl,
      shortCode,
      userId,
    },
  });
}

export async function findByShortCode(
  shortCode: string
): Promise<UrlRecord | null> {
  return prisma.url.findUnique({
    where: { shortCode },
  });
}

export async function incrementClickCount(
  shortCode: string
): Promise<void> {
  await prisma.url.update({
    where: { shortCode },
    data: {
      clickCount: {
        increment: 1,
      },
    },
  });
}
