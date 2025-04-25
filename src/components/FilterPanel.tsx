import React from 'react';
import { FilterState } from '../types';

// All specialty options based on the data-testid requirements
const SPECIALTIES = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
  'Dietitian/Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const handleConsultationChange = (type: 'Video Consult' | 'In Clinic' | null) => {
    setFilters(prev => ({
      ...prev,
      consultationType: prev.consultationType === type ? null : type
    }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFilters(prev => {
      if (prev.specialties.includes(specialty)) {
        return {
          ...prev,
          specialties: prev.specialties.filter(s => s !== specialty)
        };
      } else {
        return {
          ...prev,
          specialties: [...prev.specialties, specialty]
        };
      }
    });
  };

  const handleSortChange = (sortBy: 'fees' | 'experience' | null) => {
    setFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortBy ? null : sortBy
    }));
  };

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6">
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc"
          className="font-medium text-gray-800 mb-3"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality"
          className="font-medium text-gray-800 mb-3"
        >
          Specialty
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {SPECIALTIES.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort"
          className="font-medium text-gray-800 mb-3"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Fees (Low to High)</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;