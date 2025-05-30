

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Overview from './overview';
import Modules from './modules';
import Resources from './resources';

const TopTab = createMaterialTopTabNavigator();

export default function CourseDetailLayout() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#1E88E5' },
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#fff' }, // optional styling
      }}
    >
      <TopTab.Screen name="overview" component={Overview} options={{ title: 'Overview' }} />
      <TopTab.Screen name="modules" component={Modules} options={{ title: 'Modules' }} />
      <TopTab.Screen name="resources" component={Resources} options={{ title: 'Resources' }} />
    </TopTab.Navigator>
  );
}


