import { SAURUS_TYPES } from '@/lib/schema/saurus-type';

export const getRandomSaurusType = () => {
  const saurusTypes = SAURUS_TYPES.options;
  return saurusTypes[Math.floor(Math.random() * saurusTypes.length)];
};
