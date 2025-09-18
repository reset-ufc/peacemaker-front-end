import { useRef } from "react";

import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

const team: Array<TeamMember> = [
  {
    name: "Emanuel Avila",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/76269418?v=4",
  },
  {
    name: "José Eric",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/102836030?v=4",
  },
  {
    name: "Antonio Lucas",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/77083214?v=4",
  },
  {
    name: "Matheus Rabelo",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/65553779?v=4",
  },
  {
    name: "Carlos Jefté",
    role: "ML Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/134069354?v=4",
  },
  {
    name: "Antônio Cruz",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/106624745?v=4",
  },
  {
    name: "Silas Eufrásio",
    role: "Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/106567654?v=4",
  },
  {
    name: "Anderson Uchôa",
    role: "Develop Advocate",
    imageUrl: "https://avatars.githubusercontent.com/u/11181914?v=4",
  },
];

export function Team() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const { t } = useTranslation();

  return (
    <section
      className='relative overflow-hidden py-24 sm:py-32'
      ref={containerRef}
    >
      {/* Background elements */}
      <motion.div className='absolute inset-0 -z-10 opacity-[0.08]'>
        <div className='absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 blur-3xl' />
        <div className='absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 blur-3xl' />
      </motion.div>

      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid gap-x-8 gap-y-20 xl:grid-cols-3'>
          <motion.div
            ref={titleRef}
            className='max-w-2xl'
            initial={{ opacity: 0, y: 40 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'
            >
              <span className='inline-block'>{t("Our")}</span>{" "}
              <span className='inline-block bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent'>
                {t("Team")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='text-muted-foreground mt-6 text-lg leading-8'
            >
              {t(
                "We are a team of passionate and dedicated individuals who are committed to making a positive impact on the world through their work. We believe in the power of technology to bring people together and create a better future."
              )}
            </motion.p>
          </motion.div>

          <motion.ul
            className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
            initial='hidden'
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {team.map(person => (
              <motion.li
                key={person.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className='group bg-card/50 relative flex items-center gap-x-6 rounded-2xl border border-violet-500/10 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl'>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className='relative'
                  >
                    <img
                      alt={`Photo of ${person.name}`}
                      src={person.imageUrl || "/placeholder.svg"}
                      className='h-20 w-20 rounded-full border-2 border-violet-500/20 object-cover shadow-md transition-all duration-300 group-hover:border-violet-500/40'
                    />
                    <div className='absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  </motion.div>

                  <div>
                    <h3 className='text-foreground text-lg leading-7 font-semibold tracking-tight transition-colors duration-300 group-hover:text-violet-500'>
                      {person.name}
                    </h3>
                    <p className='mt-1 flex items-center text-sm leading-6 font-medium text-violet-500'>
                      <span className='mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-500'></span>
                      {person.role}
                    </p>
                  </div>

                  <motion.div className='absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-violet-600/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
