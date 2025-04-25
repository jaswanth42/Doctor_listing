import React from 'react';
import { Doctor } from '../types';
import { Calendar, Video, MapPin, Clock, Star, Globe, GraduationCap } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const defaultImage = "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300";

  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 flex items-center justify-center bg-gray-50">
          <img 
            src={doctor.photo || defaultImage}
            alt={`Dr. ${doctor.name}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src !== defaultImage) {
                img.src = defaultImage;
              }
            }}
          />
        </div>
        
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <h2 
              data-testid="doctor-name"
              className="text-xl font-bold text-gray-800"
            >
              {doctor.name}
            </h2>
          </div>
          
          <div 
            data-testid="doctor-specialty"
            className="flex flex-wrap gap-2 mb-3"
          >
            {doctor.specialities.map((spec, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {spec.name}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div 
              data-testid="doctor-experience"
              className="flex items-center"
            >
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {doctor.experience}
              </span>
            </div>
            
            <div 
              data-testid="doctor-fee"
              className="flex items-center font-medium"
            >
              <span className="text-green-600">{doctor.fees}</span>
              <span className="text-sm text-gray-500 ml-1">consultation fee</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {doctor.doctor_introduction && (
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                <span>{doctor.doctor_introduction}</span>
              </div>
            )}
            {doctor.clinic && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span>{doctor.clinic.name}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
              </div>
            )}
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 text-gray-400 mr-2" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {doctor.in_clinic && (
              <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                <span>In Clinic</span>
              </div>
            )}
            {doctor.video_consult && (
              <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                <Video className="h-4 w-4 text-blue-600 mr-1" />
                <span>Video Consult</span>
              </div>
            )}
          </div>
          
          <button className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;