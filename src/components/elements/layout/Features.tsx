import {
  CloudUploadIcon,
  FingerprintIcon,
  LockIcon,
  type LucideIcon,
  RefreshCwIcon,
} from "lucide-react";

type Features = {
  name: string;
  description: string;
  icon: LucideIcon;
  link?: string;
};

const features: Array<Features> = [
  {
    name: "Ease Installation",
    description:
      "To get the bot working in your repository all you need to do is install it on Github Marketplace. ",
    icon: CloudUploadIcon,
    link: "https://github.com/apps/thepeacemakerbot",
  },
  {
    name: "GitHub Integration",
    description:
      "You can acess your incivilized comments and repositories analysis loging with your Github account.",
    icon: LockIcon,
  },
  {
    name: "Fast and Simple",
    description:
      "The bot is very easy to use and doesn't require any configuration, with the analysis of the comments starting automatically.",
    icon: RefreshCwIcon,
  },
  {
    name: "No intrusive politics",
    description: "The bot doesn't interfere with your comments ",
    icon: FingerprintIcon,
  },
];

export function Features() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Moderate your repositories
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {/* Everything you need moderate your issues, pull requests and comments */}
            The Peacemaker is a non intrusive Github bot that helps you manage
            your repositories issues and pull requests.
          </p>
          {/* <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p> */}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map(feature => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-primary-foreground"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
                <p>
                  {feature.link && (
                    <a href={feature.link} target="_blank" rel="noreferrer">
                      See more
                    </a>
                  )}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
