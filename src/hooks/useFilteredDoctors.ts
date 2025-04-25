import { useMemo } from 'react';
import { Doctor, FilterState } from '../types';

export const useFilteredDoctors = (doctors: Doctor[], filters: FilterState) => {
  return useMemo(() => {
    let filteredDoctors = [...doctors];

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.name.toLowerCase().includes(query)
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        if (filters.consultationType === 'Video Consult') {
          return doctor.video_consult;
        } else if (filters.consultationType === 'In Clinic') {
          return doctor.in_clinic;
        }
        return true;
      });
    }

    // Apply specialties filter
    if (filters.specialties.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        filters.specialties.some(specialty => 
          doctor.specialities?.some(s => s.name === specialty) ?? false
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredDoctors.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          // Remove '₹' and convert to number
          const aFees = parseInt(a.fees.replace('₹', '').trim());
          const bFees = parseInt(b.fees.replace('₹', '').trim());
          return aFees - bFees; // Ascending
        } else if (filters.sortBy === 'experience') {
          // Extract years from experience string
          const aExp = parseInt(a.experience.split(' ')[0]);
          const bExp = parseInt(b.experience.split(' ')[0]);
          return bExp - aExp; // Descending
        }
        return 0;
      });
    }

    return filteredDoctors;
  }, [doctors, filters]);
};

export default useFilteredDoctors;