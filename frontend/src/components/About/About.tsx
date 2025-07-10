export default function About() {
  const generalTextStyle: React.CSSProperties = {
    padding: "20px",
    height: "100%",
    overflowY: "auto",
    maxWidth: "1024px"
  }

  return (
    <div style={generalTextStyle}>
      <p>
        My name is Christopher O'Connell, and I am a software engineer with a passion for building engaging and interactive web applications.
        This project is a Boggle game that I developed to showcase my skills in React, TypeScript, and web development.
      </p>
      <p>
        I bring proven expertise in designing and building scalable APIs, responsive dashboards, and data-intensive applications using a
        comprehensive modern technology stack that includes Node.js, React, Elasticsearch, MongoDB, Redis, AWS, and Docker. My hands-on
        experience spans the full development lifecycle—from initial architecture and coding to deployment and maintenance—ensuring
        robust performance and high availability in production environments.
      </p>
      <p>
        I specialize in integrating complex data visualizations with tools like D3.js and LeafletJS, focusing on delivering interactive,
        insightful user experiences. My work emphasizes optimizing these visualizations to function smoothly even in low-bandwidth or
        resource-constrained scenarios, making critical information accessible without sacrificing performance or responsiveness.
      </p>
      <p>
        Beyond development, I have successfully implemented machine learning models aimed at improving the relevance and personalization of
        user interactions. These solutions have enhanced overall application usability and user satisfaction, demonstrating my ability to
        blend advanced technologies with practical, user-focused design.
      </p>
      <p>
        As a leader, I have guided Agile teams through fast-paced development cycles, promoting collaboration, code quality, and continuous
        learning. I take pride in mentoring junior developers, helping them grow their technical skills and confidence, which ultimately
        strengthens team capability and drives project success.
      </p>
      <p>
        My strategic contributions also extend to delivering measurable business impact. I have architected search-driven self-service
        systems that reduced call center reliance, generating an estimated 10 million dollars in yearly cost savings. By balancing technical
        innovation with real-world business needs, I consistently create scalable, maintainable solutions that support long-term organizational
        goals.
      </p>
      <p>
        In my spare time I like designing 3D printable parts with Fusion 360 for my printer.  I design these parts to pair with my ESP32 home
        automation projects such as my smart scale, smart thermostat, and smart buttons.  I build and fly my own drones as a hobby along with
        managing my own home servers.  I configure bare metal for management of data, virtual machines, and containers.  It is my testing
        ground for my passions as an engineer.
      </p>
      <p>
        Please connect with me today to make your company mission my mission!
      </p>
    </div>
  );
}