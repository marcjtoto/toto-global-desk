import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const claimLabel = z.enum([
  'verified',
  'strongly-supported',
  'reported-unconfirmed',
  'disputed',
  'false-misleading',
  'unknown',
]);

const sourceSchema = z.object({
  title: z.string(),
  publisher: z.string(),
  url: z.string(),
  date: z.string(),
  type: z.enum(['primary', 'secondary', 'lead']),
});

const claimSchema = z.object({
  id: z.string(),
  text: z.string(),
  label: claimLabel,
});

const desks = z.enum([
  'investigations',
  'brazil',
  'usa',
  'world',
  'corruption-watch',
  'war-watch',
  'data-lab',
  'opinion',
  'breaking',
]);

const stories = defineCollection({
  loader: glob({ base: './src/content/stories', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    desk: desks,
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    authors: z.array(z.string()),
    status: z.enum(['demo', 'draft', 'published']).default('demo'),
    kicker: z.string().default('DEMO'),
    featured: z.boolean().default(false),
    breaking: z.boolean().default(false),
    lang: z.enum(['en', 'pt-br']),
    translationKey: z.string(),
    claims: z.array(claimSchema).default([]),
    sources: z.array(sourceSchema).default([]),
  }),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    centralQuestion: z.string(),
    jurisdiction: z.string(),
    publicationStatus: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    authors: z.array(z.string()),
    status: z.enum(['demo', 'draft', 'published']).default('demo'),
    kicker: z.string().default('DEMO'),
    lang: z.enum(['en', 'pt-br']),
    translationKey: z.string(),
    people: z.array(z.string()).default([]),
    entities: z.array(z.string()).default([]),
    claims: z.array(claimSchema).default([]),
    sources: z.array(sourceSchema).default([]),
    evidence: z.array(
      z.object({
        id: z.string(),
        item: z.string(),
        source: z.string(),
        dateObtained: z.string(),
        originalDate: z.string(),
        reliability: z.enum(['high', 'medium', 'low']),
        supports: z.string(),
        doesNotProve: z.string(),
        verification: z.enum(['verified', 'pending', 'disputed']),
      }),
    ),
    timeline: z.array(
      z.object({
        date: z.string(),
        event: z.string(),
        evidenceId: z.string(),
        confidence: z.enum(['high', 'medium', 'low']),
        why: z.string(),
      }),
    ),
    subjectResponse: z.string(),
  }),
});

export const collections = { stories, cases };
