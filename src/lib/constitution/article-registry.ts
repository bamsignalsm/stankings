/**
 * Authoritative registry of published Volume I Articles.
 * TOC canon references and Convention audit derive from here.
 */

import type { ConstitutionalArticle } from "@/lib/constitution/articles/types";
import { ARTICLE_I } from "@/lib/constitution/articles/article-i";
import { ARTICLE_II } from "@/lib/constitution/articles/article-ii";
import { ARTICLE_III } from "@/lib/constitution/articles/article-iii";
import { ARTICLE_IV } from "@/lib/constitution/articles/article-iv";
import { ARTICLE_V } from "@/lib/constitution/articles/article-v";
import { ARTICLE_VI } from "@/lib/constitution/articles/article-vi";
import { ARTICLE_VII } from "@/lib/constitution/articles/article-vii";
import { ARTICLE_VIII } from "@/lib/constitution/articles/article-viii";
import { ARTICLE_IX } from "@/lib/constitution/articles/article-ix";
import { ARTICLE_X } from "@/lib/constitution/articles/article-x";
import { ARTICLE_XI } from "@/lib/constitution/articles/article-xi";
import { ARTICLE_XII } from "@/lib/constitution/articles/article-xii";
import { ARTICLE_XIII } from "@/lib/constitution/articles/article-xiii";
import { ARTICLE_XIV } from "@/lib/constitution/articles/article-xiv";
import { ARTICLE_XV } from "@/lib/constitution/articles/article-xv";
import { ARTICLE_XVI } from "@/lib/constitution/articles/article-xvi";
import { ARTICLE_XVII } from "@/lib/constitution/articles/article-xvii";

export const PUBLISHED_CONSTITUTIONAL_ARTICLES: readonly ConstitutionalArticle[] = [
  ARTICLE_I,
  ARTICLE_II,
  ARTICLE_III,
  ARTICLE_IV,
  ARTICLE_V,
  ARTICLE_VI,
  ARTICLE_VII,
  ARTICLE_VIII,
  ARTICLE_IX,
  ARTICLE_X,
  ARTICLE_XI,
  ARTICLE_XII,
  ARTICLE_XIII,
  ARTICLE_XIV,
  ARTICLE_XV,
  ARTICLE_XVI,
  ARTICLE_XVII,
] as const;

export const VOLUME_I_ARTICLE_COUNT = PUBLISHED_CONSTITUTIONAL_ARTICLES.length;

export function getPublishedArticle(id: string): ConstitutionalArticle | undefined {
  return PUBLISHED_CONSTITUTIONAL_ARTICLES.find((a) => a.id === id);
}

export function getAuthoritativeCanonRefs(articleId: string): readonly string[] {
  return getPublishedArticle(articleId)?.canonRefs ?? [];
}

export function getAdjacentArticles(articleId: string): {
  prev?: ConstitutionalArticle;
  next?: ConstitutionalArticle;
} {
  const idx = PUBLISHED_CONSTITUTIONAL_ARTICLES.findIndex((a) => a.id === articleId);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? PUBLISHED_CONSTITUTIONAL_ARTICLES[idx - 1] : undefined,
    next:
      idx < PUBLISHED_CONSTITUTIONAL_ARTICLES.length - 1
        ? PUBLISHED_CONSTITUTIONAL_ARTICLES[idx + 1]
        : undefined,
  };
}
