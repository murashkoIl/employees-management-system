import { Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./PdfViewerPattern1.styles";
import innoLogo from "@assets/images/innoLogo.png";
import redLine from "@assets/images/redLine.png";
import { PdfViewerProps } from "../../PdfViewer/PdfViewer.types";

export const PdfViewerPattern1 = ({ data }: PdfViewerProps) => {
  const { user, projects, languages, skills } = data;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionLeft}>
        <>
          <Image style={styles.logo} src={innoLogo}></Image>
          <Text style={styles.subtitle}>Personal Info</Text>
          <div>
            <Text style={styles.text}>
              {"Email: "}
              {user?.email || "<Email here>"}
            </Text>
          </div>
          <Image style={styles.sideRedLine} src={redLine}></Image>
          <Text style={styles.subtitle}>Skills</Text>
          {user?.profile?.skills.map((skill) => (
            <Text key={skill.skill_name} style={styles.text}>
              {skill.skill_name || "Skill name"} -
              {" " + skill.mastery || "Skill mastery"}
            </Text>
          )) ||
            skills.map((skill) => (
              <Text key={skill.skill_name} style={styles.text}>
                {skill.skill_name || "Skill name"} -
                {" " + skill.mastery || "Skill mastery"}
              </Text>
            ))}
          <Image style={styles.sideRedLine} src={redLine}></Image>
          <Text style={styles.subtitle}>Languages</Text>
          {user?.profile?.languages.map((language) => (
            <Text key={language.language_name} style={styles.text}>
              {language.language_name || "Language name"} -
              {" " + language.proficiency.toUpperCase() || "Proficiency"}
            </Text>
          )) ||
            languages.map((language) => (
              <Text key={language.language_name} style={styles.text}>
                {language.language_name || "Language name"} -
                {" " + language.proficiency.toUpperCase() || "Proficiency"}
              </Text>
            ))}
          <Image style={styles.sideRedLine} src={redLine}></Image>
        </>
      </View>
      <View style={styles.sectionRight}>
        <Text style={styles.headerText}>
          {user?.profile?.full_name || "<Full name here>"}
        </Text>
        <Image style={styles.redLine} src={redLine}></Image>
        <Text>Experience</Text>
        {projects?.map((project) => (
          <div key={project.name}>
            <Text style={styles.subtitle}>{"< " + project.name + " >"}</Text>
            <div style={styles.flex}>
              <Text style={styles.date}>
                {project.start_date} - {project.end_date}
              </Text>
              <Text style={styles.text}>
                {"Team size: " + project.team_size}
              </Text>
            </div>
            <Text style={styles.text}>Tech Stack</Text>
            {project?.tech_stack?.map((tech) => (
              <Text style={styles.text}>{tech?.name}</Text>
            ))}
            <Text style={styles.text}>{project.description}</Text>
            <Text style={styles.subtitle}>
              {project?.tech_stack?.map((tech) => (
                <Text style={styles.text}>{tech.name}</Text>
              ))}
            </Text>
          </div>
        ))}
      </View>
    </Page>
  );
};
