import dayjs from 'dayjs';
import { Alert } from 'react-native';

export const createEvent = (assetId, propertyId, value, type) => {
  const event = {
    assetId: assetId,
    propertyId: [propertyId],
    Timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
    Values: {
      value: value,
    },
    ValueType: [type],
  };
  return event;
};

export const getValueType = (dataType) => {
  if (dataType === 'DOUBLE') return 'doubleValue';
  if (dataType === 'INTEGER') return 'integerValue';
  if (dataType === 'BOOLEAN') return 'booleanValue';
  if (dataType === 'STRING') return 'stringValue';
  return null;
};

export const round = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
