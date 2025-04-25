export interface Doctor {
  id: number;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Array<{ name: string }>;
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export type ConsultationType = 'Video Consult' | 'In Clinic' | null;

export interface FilterState {
  searchQuery: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
}