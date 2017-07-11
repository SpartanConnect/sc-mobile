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
    backgroundColor: '#dfdfdf',
    borderRadius: 6,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
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
