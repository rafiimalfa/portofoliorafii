// src/app/projects/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- sumber data super ringkas ---
type Project = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  jobDesc: string;
  tools: { name: string; icon?: string }[];
};

const PROJECTS: Record<string, Project> = {
  p1: {
    id: "p1",
    title: "Portal Sekolah Website",
    image: "/projects/portal-3.png",
    tags: ["Manual Testing", "Automation Testing", "Performance Testing"],
    jobDesc:
      "As a Quality Assurance professional for the “Portal Sekolah Website” project, I was responsible for ensuring product quality and functionality. During manual testing, my focus was on the question creation feature for teachers and admins. I performed testing with various question types and consistently identified issues in the front-end and data inconsistencies, which I then documented by creating bug tickets in Jira.\n\nFurthermore, I developed automation tests for critical user flows, from login to the assessment creation process for teachers. I also conducted performance testing using the stress-test method, where I utilized JMeter to execute tests with thousands of concurrent users to ensure the system’s stability under high load.",
    tools: [
      { name: "Selenium", icon: "/tools/selenium.png" },
      { name: "Java",     icon: "/tools/java.png" },
      { name: "JMeter",   icon: "/tools/jmeter.png" },
      { name: "Postman",  icon: "/tools/postman.png" },
      { name: "Jira",     icon: "/tools/jira.png" },
      { name: "IntelliJ", icon: "/tools/intellij.png" },
    ],
  },
  p2: {
    id: "p2",
    title: "Portal Kampus Website",
    image: "/projects/portal-4.png",
    tags: ["Manual Testing"],
    jobDesc:
      "As a Quality Assurance professional for the Portal Kampus Website project, I was heavily involved in manual testing, with a primary focus on the assignment creation feature for lecturers. I thoroughly tested the entire process, ensuring that lecturers could create, assign, and manage tasks for their students seamlessly. My role also included verifying the student-facing side of the platform, ensuring tasks were displayed correctly and the submission process was smooth and error-free. I was also responsible for conducting back-end testing to identify any API response errors, which was a crucial step in maintaining data integrity and system stability. By meticulously checking for inconsistencies in data retrieval and ensuring all back-end processes were functioning correctly, I played a key role in delivering a reliable and high-quality product for both lecturers and students.",
    tools: [
      { name: "Postman",  icon: "/tools/postman.png" },
      { name: "Jira",     icon: "/tools/jira.png" },
    ],
  },
   p3: {
    id: "p3",
    title: "Portal Sekolah Android Student App",
    image: "/projects/portal-5.png",
    tags: ["Manual Testing"],
    jobDesc:
      "As a Quality Assurance professional for the Portal Sekolah Android Student App project, I was deeply involved in testing the latest version of the application. My responsibilities included comprehensive manual testing of critical features such as user login, profile management, and the core functionality of taking assessments. I also collaborated closely with the development team to ensure a seamless user experience. My role extended to back-end testing, where I meticulously checked for API response errors. By actively identifying and reporting issues in the back-end, I was able to maintain data integrity and ensure the application's overall stability. My work was crucial in delivering a reliable and high-quality app for students.",
    tools: [
      { name: "Postman",  icon: "/tools/postman.png" },
      { name: "Jira",     icon: "/tools/jira.png" },
    ],
  },
     p4: {
    id: "p4",
    title: "Portal Sekolah Assessment App iOS",
    image: "/projects/portal-6.png",
    tags: ["Manual Testing"],
    jobDesc:
      "As a Quality Assurance professional for the Portal Sekolah Assessment App iOS project, my primary responsibility was to ensure the quality and functionality of the application on the iOS platform. My main focus was on comprehensive manual testing of the assessment list feature. I meticulously tested this section to guarantee a seamless and error-free user experience for students. I also collaborated closely with the development team and other QA members to maintain a high-quality standard across all our products. My detailed testing efforts on the iOS app contributed to ensuring the app's reliability and consistency with its Android counterpart, helping to deliver a robust and trustworthy application for users.",
    tools: [
      { name: "Postman",  icon: "/tools/postman.png" },
      { name: "Jira",     icon: "/tools/jira.png" },
    ],
  },
};

type PageProps = { params: { id: string } };

export default function ProjectDetailPage({ params }: PageProps) {
  const project = PROJECTS[params.id];
  if (!project) return notFound();

  return (
    <section className="relative bg-white text-black">
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* Back Button (link ke section My Projects) */}
        <Link
          href="/#projects"
          aria-label="Back to My Projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-black/70 hover:text-black transition"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/25 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </span>
          Back to Projects
        </Link>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] bg-black/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="mt-8 font-montserrat text-2xl md:text-[28px] font-medium">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <span
              key={i}
              className="font-montserrat text-xs px-3 py-[6px] rounded-full border border-black/25 text-black/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <h2 className="font-montserrat text-sm font-semibold text-black/80 mb-2">
            Job Description
          </h2>
          <p className="font-montserrat text-[13px] leading-6 text-black/80 whitespace-pre-line">
            {project.jobDesc}
          </p>
        </div>

        {/* Tools (kanan → kiri) */}
         {/* Tools (kiri → kanan) */}
        {/* Tools (kiri → kanan) */}
<div className="mt-6">
  <h3 className="font-montserrat text-sm font-semibold text-black/80 mb-2">
    Tools
  </h3>
  <div className="flex flex-row items-center gap-2">
    {project.tools.map((tool) => (
      <span
        key={tool.name}
        className="inline-flex items-center justify-center"
        title={tool.name}
      >
        {tool.icon ? (
          <Image
            src={tool.icon}
            alt={tool.name}
            width={78}
            height={78}
            className="object-contain"
          />
        ) : (
          <span className="text-sm font-montserrat text-black/70">
            {tool.name}
          </span>
        )}
      </span>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}