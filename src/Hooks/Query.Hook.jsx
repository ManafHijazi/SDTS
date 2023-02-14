import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @author Manaf Hijazi (mhijazi@beyond.ai)
 * @Description this custom hook is to get the query params
 */
export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
