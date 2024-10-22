export type Nicca = {
  id: string;
  userId: string;
  title: string;
  saurusType: string;
  isActive: boolean;
  week?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  achievements: Achievement[];
};

export type Achievement = {
  id: string;
  niccaId: string;
  achievedDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NiccaWithRelations = Nicca & {
  achievements: Achievement[];
};

export type NiccaList = Nicca[];
