import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, ConsultationType } from '../types';

export const useQueryParams = (filters: FilterState, setFilters: React.Dispatch<React.SetStateAction<FilterState>>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.searchQuery) {
      params.set('search', filters.searchQuery);
    }
    
    if (filters.consultationType) {
      params.set('consult', filters.consultationType);
    }
    
    if (filters.specialties.length > 0) {
      params.set('specialties', filters.specialties.join(','));
    }
    
    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    }
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Update filters when URL changes
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const consult = searchParams.get('consult') as ConsultationType;
    const specialtiesParam = searchParams.get('specialties');
    const specialties = specialtiesParam ? specialtiesParam.split(',') : [];
    const sortBy = searchParams.get('sortBy') as 'fees' | 'experience' | null;

    setFilters({
      searchQuery: search,
      consultationType: consult,
      specialties,
      sortBy
    });
  }, [searchParams, setFilters]);
};

export default useQueryParams;