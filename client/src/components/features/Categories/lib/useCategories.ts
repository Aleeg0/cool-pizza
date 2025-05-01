import {useEffect, useState} from "react";
import {scrollToSection} from "./scrollToSection";
import {Category} from "@/store/types/Category";
import {UUID} from "@/store/types/shared";

export const useCategories = (initialCategories: Category[]) => {
  const [categories] = useState<Category[]>(initialCategories);
  const [currentCategoryId, setCurrentCategoryId] = useState<UUID>(initialCategories[0]?.id ?? "");
  const [visibleCount, setVisibleCount] = useState(5);

  // resize effect
  useEffect(() => {
    const handleResize = () => {
      const count = updateVisibleCategories();
      setVisibleCount(count);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }

  },[]);

  const selectCategory = (item: Category) => {
    setCurrentCategoryId(item.id);
    scrollToSection(item.name);
  };

  return {
    categories,
    currentCategoryId,
    visibleCount,
    selectCategory,
  };
}

const updateVisibleCategories = () => {
  const width = window.innerWidth;
  let count = 0;
  if (width < WindowSizes.XS) count = 3
  else if (width < WindowSizes.S) count = 4;
  else if (width < WindowSizes.M) count = 5;
  else if (width < WindowSizes.L) count = 6;
  else count = 7;
  return count;
}

enum WindowSizes {
  XS = 768,
  S = 1024,
  M = 1440,
  L = 1920
}