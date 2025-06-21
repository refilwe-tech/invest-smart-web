export const AboutPage = () => {
  const teamMembers = [
    {
      name: "OE Fenyane",
      studentNumber: "221862104",
      email: "221862104@tut4life.ac.za",
    },
    {
      name: "Ntsaluba AL",
      studentNumber: "222794676",
      email: "222794676@tut4life.ac.za",
    },
    {
      name: "Mofokeng T",
      studentNumber: "221180305",
      email: "221180305@tut4life.ac.za",
    },
    {
      name: "Bosetsi TJ",
      studentNumber: "222472954",
      email: "222472954@tut4life.ac.za",
    },
    {
      name: "Komeni S",
      studentNumber: "220366510",
      email: "220366510@tut4life.ac.za",
    },
    {
      name: "Selota AL",
      studentNumber: "219447000",
      email: "219447000@tut4life.ac.za",
    },
    {
      name: "Sithole L",
      studentNumber: "223930735",
      email: "223930735@tut4life.ac.za",
    },
    {
      name: "Mashilo KM",
      studentNumber: "214060159",
      email: "214060159@tut4life.ac.za",
    },
    {
      name: "Moseri JK",
      studentNumber: "220622436",
      email: "220622436@tut4life.ac.za",
    },
    {
      name: "Matlala TS",
      studentNumber: "230678065",
      email: "230678065@tut4life.ac.za",
    },
  ];

  return (
    <div className="bg-tertiary min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Invest Smart
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Finding the best financial institution to grow your money can be
            overwhelming. Whether you're saving for retirement, building wealth,
            or just starting your investment journey, we simplify the process
            for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
            <span className="bg-primary text-white px-6 py-2 rounded-full">
              Find the best investments—fast
            </span>
            <span className="bg-secondary text-white px-6 py-2 rounded-full">
              Grow your money with confidence
            </span>
            <span className="bg-primary-dark text-white px-6 py-2 rounded-full">
              Smart investing starts here
            </span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-dark">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We believe that everyone deserves access to smart investment
            opportunities. Our platform empowers you to compare, choose, and
            grow your wealth with confidence. We're here to make investing
            accessible, transparent, and profitable for everyone.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Our dedicated team of students working together to revolutionize the
            way you invest
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-dark rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-700 hover:border-primary group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-white font-bold text-2xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Student #: {member.studentNumber}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-primary hover:text-secondary transition-colors duration-300 text-sm font-medium hover:underline"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-16 bg-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Transparency
              </h3>
              <p className="text-gray-300">
                We believe in clear, honest information about every investment
                opportunity we present.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Simplicity</h3>
              <p className="text-gray-300">
                Complex investing made simple. We break down barriers to make
                investing accessible to all.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-gray-300">
                We strive for excellence in everything we do, from our platform
                to our customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-tertiary border-t border-gray-700 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
          <p className="text-gray-300 mb-6 text-lg">
            Have questions about investing or want to learn more about our
            platform? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:investsmart.invest@gmail.com"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us: investsmart.invest@gmail.com
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2024 Invest Smart. Making smart investing accessible to
              everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
