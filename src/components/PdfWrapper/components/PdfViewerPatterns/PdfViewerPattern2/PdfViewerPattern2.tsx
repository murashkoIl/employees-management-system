import { PdfViewerProps } from "../../PdfViewer/PdfViewer.types";
import { Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./PdfViewerPattern2.styles";
import innoLogo from "@assets/images/innoLogo.png";
import redLine from "@assets/images/redLine.png";

export const PdfViewerPattern2 = ({ data }: PdfViewerProps) => {
  const { user, projects, languages, skills } = data;

  return (
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={innoLogo}></Image>
      <div style={styles.header}>
        <Image style={styles.redLineHeader} src={redLine}></Image>
      </div>
      <div style={styles.flex}>
        <View style={styles.sectionLeft}>
          <Text style={styles.fullname}>
            {user?.profile?.full_name || "<Full name here>"}
          </Text>
          <Text style={styles.positionNames}>
            {user?.position_name || "<Position>"}
          </Text>
        </View>
        <View style={styles.sectionRight}>
          <Image style={styles.redLineCenter} src={redLine}></Image>
          <Text style={styles.contacts}>{"Email: " + user?.email}</Text>2
          <Text style={styles.subtitle}>Programming Technologies</Text>
          {user?.profile?.skills.map((skill) => (
            <Text key={skill.skill_name} style={styles.text}>
              {skill?.skill_name + "  ~  " + skill?.mastery}
            </Text>
          )) ||
            skills.map((skill) => (
              <Text key={skill.skill_name} style={styles.text}>
                {skill?.skill_name + "  ~  " + skill?.mastery}
              </Text>
            ))}
          <div>
            {user?.profile?.languages && (
              <Text style={styles.subtitle}>Language proficiency</Text>
            )}
            {user?.profile?.languages.map((language) => (
              <Text key={language.language_name} style={styles.text}>
                {language?.language_name +
                  "  ~  " +
                  language?.proficiency.toUpperCase()}
              </Text>
            )) ||
              languages.map((language) => (
                <Text key={language.language_name} style={styles.text}>
                  {language?.language_name +
                    "  ~  " +
                    language?.proficiency.toUpperCase()}
                </Text>
              ))}
          </div>
          <Image style={styles.redLineRight} src={redLine}></Image>
        </View>
      </div>
      <Text style={styles.experience}>Experience</Text>
      <div style={styles.projects}>
        {projects?.map((project) => (
          <div style={styles.project} key={project.internal_name}>
            <div>
              <Text style={styles.subtitle}>
                {project.name || "Project name"}
              </Text>
              <Text style={styles.text}>
                {project?.start_date +
                  " ~ " +
                  (project?.end_date || "Till now")}
              </Text>
              <Text style={styles.text}>Team Size ~ {project?.team_size}</Text>
              <Text style={styles.subtitle}>Project Stack</Text>
              {project?.tech_stack?.map((tech) => (
                <Text style={styles.text}>{tech?.name}</Text>
              ))}
              <Image style={styles.redLineLeft} src={redLine}></Image>
            </div>
            <div style={styles.projectRight}>
              <Text style={styles.projectText}>{project.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};
