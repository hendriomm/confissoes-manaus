export interface ConfessionSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Church {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  latitude: number;
  longitude: number;
  confessionSchedules: ConfessionSchedule[];
  priestName?: string;
  notes?: string;
}
