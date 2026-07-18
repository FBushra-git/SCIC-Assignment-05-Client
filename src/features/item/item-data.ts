export type ItemPriority = "Beginner" | "Intermediate" | "Advanced";

export type Item = {
  id: string;
  authorName: string;
  title: string;
  shortDescription: string;
  description: string;
  priority: ItemPriority;
  targetDate: string | null;
  imageUrl: string | null;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export type ItemDetails = Item & { related: Item[] };

export type ItemInput = {
  title: string;
  shortDescription: string;
  description: string;
  priority: ItemPriority;
  targetDate: string | null;
  imageUrl: string | null;
  technologies: string[];
};

export type ItemFilters = {
  search: string;
  priority: string;
  technology: string;
  sort: "newest" | "oldest" | "alphabetical" | "deadline";
  page: number;
};

export type ItemResult = {
  items: Item[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  facets: {
    priorities: ItemPriority[];
    technologies: string[];
  };
};
