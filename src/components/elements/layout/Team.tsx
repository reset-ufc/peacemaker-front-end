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
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We are a team of passionate and dedicated individuals who are
            committed to making a positive impact on the world through their
            work. We believe in the power of technology to bring people together
            and create a better future.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {team.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-foreground">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-primary">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
