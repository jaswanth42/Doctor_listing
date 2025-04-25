import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import useDoctorData from './hooks/useDoctorData';
import useFilteredDoctors from './hooks/useFilteredDoctors';
import useQueryParams from './hooks/useQueryParams';
import { FilterState } from './types';
import { PlusCircle } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    consultationType: null,
    specialties: [],
    sortBy: null
  });

  const { doctors, loading, error } = useDoctorData();
  const filteredDoctors = useFilteredDoctors(doctors, filters);

  const handleSetSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <PlusCircle className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">MediConnect</h1>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar 
              doctors={doctors} 
              searchQuery={filters.searchQuery} 
              setSearchQuery={handleSetSearchQuery} 
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <FilterPanel filters={filters} setFilters={setFilters} />
            
            <div className="flex-1">
              <DoctorList doctors={filteredDoctors} loading={loading} />
            </div>
          </div>
        )}
      </main>

      {/* Use the QueryParams hook to handle URL synchronization */}
      {useQueryParams(filters, setFilters)}
    </div>
  );
}

export default App;