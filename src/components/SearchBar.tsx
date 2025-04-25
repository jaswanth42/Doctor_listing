import React, { useState, useEffect, useRef } from 'react';
import { Doctor } from '../types';
import { Search, MapPin, Video } from 'lucide-react';

interface SearchBarProps {
  doctors: Doctor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialities.some(spec => spec.name.toLowerCase().includes(query)) ||
        doctor.clinic.address.locality.toLowerCase().includes(query) ||
        doctor.clinic.address.city.toLowerCase().includes(query)
      )
      .slice(0, 5); // Show top 5 matches
    
    setSuggestions(matchedDoctors);
  }, [searchQuery, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          data-testid="autocomplete-input"
          className="w-full p-4 pl-10 text-sm bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search doctors by name, specialty, or location..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 overflow-hidden divide-y divide-gray-100"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => handleSuggestionClick(doctor)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300";
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.specialities.map((spec, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                      >
                        {spec.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.clinic.address.locality}, {doctor.clinic.address.city}
                    </div>
                    <div className="flex items-center">
                      {doctor.fees}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {doctor.in_clinic && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        In Clinic
                      </span>
                    )}
                    {doctor.video_consult && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full flex items-center">
                        <Video className="h-3 w-3 mr-1" />
                        Video Consult
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;