import {useCallback, useEffect, useState} from "react";
import {scrollToSection} from "./scrollToSection";
import {Category} from "@/store/types/Category";
import {UUID} from "@/store/types/shared";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {selectCurrentCategoryId, selectExistCategories, setCurrentCategoryId} from "@/store/model/Products";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const existCategories = useAppSelector(selectExistCategories);
  const [visibleCount, setVisibleCount] = useState(5);

  // resize effect
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(updateVisibleCategories());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  },[]);

  const selectCategory = useCallback((item: Category) => {
    dispatch(setCurrentCategoryId(item.id));
    scrollToSection(item.name);
  }, [dispatch]);

  return {
    categories: existCategories,
    currentCategoryId: useAppSelector(selectCurrentCategoryId),
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