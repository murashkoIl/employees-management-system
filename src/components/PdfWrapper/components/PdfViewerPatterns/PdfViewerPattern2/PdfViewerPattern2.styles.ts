import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: "25px 0",
    maxWidth: "605px",
    backgroundColor: "#E4E4E4",
  },
  sectionLeft: {
    margin: "25px 0 0 70px",
    width: "302.5px",
  },
  sectionRight: {
    position: "relative",
    width: "302.5px",
    height: "100%",
    marginRight: 25,
    marginTop: 25,
    marginLeft: "-25px",
  },
  fullname: {
    marginTop: "20px",
  },
  experience: {
    margin: "0 0 0 75px",
  },
  projects: {
    marginLeft: 25,
  },
  positionNames: {
    width: "302.5px",
    margin: "10px -30px",
    fontSize: "10px",
  },
  project: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: "80px",
    height: "25px",
    position: "absolute",
    top: 15,
    right: 25,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  redLineHeader: {
    width: "93%",
    height: "80px",
    margin: "15px 20px",
  },
  redLineCenter: {
    position: "absolute",
    top: "250px",
    left: "-375px",
    width: "80vh",
    height: "80px",
    transform: "rotate(90deg)",
  },
  redLineLeft: {
    width: "130%",
    height: "40px",
  },
  redLineRight: {
    width: "100%",
    height: "80px",
  },
  redLineCenterShort: {
    width: "50px",
    height: "50px",
  },
  sideRedLine: {
    width: "150px",
    height: "50px",
    margin: "-10px 0",
  },
  contacts: {
    paddingBottom: "5px",
    marginTop: "-18px",
    fontSize: "13px",
  },
  subtitle: {
    fontSize: "14px",
    marginTop: "20px",
  },
  date: {
    fontSize: "10px",
    marginTop: "6px",
  },
  text: {
    margin: "6px 0 0 0px",
    fontSize: "10px",
  },
  projectRight: {
    width: "270px",
    marginLeft: "170px",
    marginRight: 25,
    fontSize: "10px",
  },
  projectText: {
    fontSize: "10px",
  },
  rightText: {
    fontSize: "10px",
  },
});
