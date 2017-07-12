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
    padding: 20
  },
  announcementDescription:
  {
    marginTop: 10,
    marginBottom: 5,
  },
  announcementCoreText:
  {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    lineHeight: 30,
  },
  pageTitle:
  {
    fontSize: 24,
    fontWeight: "700",
    textAlign: 'center',
    padding: 10
  },
  date:
  {
    marginTop: 60, marginRight: 4, color:"#8c8b8a"
  },

});

export const AppTextStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700"
  },
  bold: {
    fontWeight: "500"
  }
});
