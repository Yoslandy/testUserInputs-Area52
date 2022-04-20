import { View, Text } from 'react-native';
import React from 'react';
import { IoTSiteWiseClient, AssociateAssetsCommand } from '@aws-sdk/client-iotsitewise';

export default function TestingIoTClient() {
  const client = new IoTSiteWiseClient({ region: 'us-east-1' });
  const params = {
    /** input parameters */
  };
  const command = new AssociateAssetsCommand(params);

  return (
    <View>
      <Text>TestingIoTClient</Text>
    </View>
  );
}
