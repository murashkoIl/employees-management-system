import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    maxWidth: "605px",
    backgroundColor: "#E4E4E4",
  },
  sectionLeft: {
    margin: 25,
    width: "200px",
  },
  sectionRight: {
    width: "405px",
    marginRight: 25,
    marginTop: 25,
  },
  logo: {
    width: "160px",
    height: "50px",
    marginBottom: "50px",
  },
  redLine: {
    width: "350px",
    height: "80px",
    margin: "-20px 0",
  },
  sideRedLine: {
    width: "150px",
    height: "50px",
    margin: "-10px 0",
  },
  headerText: {
    marginTop: "16px",
  },
  subtitle: {
    fontSize: "12.5px",
    margin: "6px 0 0 0",
  },
  date: {
    fontSize: "10px",
    marginTop: "6px",
  },
  text: {
    margin: "6px 0 0 0",
    fontSize: "10px",
  },
  project: {
    margin: "10px 0",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
