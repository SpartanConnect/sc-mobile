// ----------------- Styles ---------------

import { StyleSheet} from 'react-native';


export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  announcement: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    margin: 0,
    marginTop: 2,
    marginBottom: 0,
    padding: 10
  },
  announcementDescription: {
    padding: 10
  },
});

export const AppTextStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500"
  },
  bold: {
    fontWeight: "500"
  }
});
