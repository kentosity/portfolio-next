type ProjectArtProps = {
  slug: string;
  className?: string;
};

const colors = {
  yellow: "#f7d538",
  red: "#e74930",
  blue: "#243bb4",
  ink: "#20201e",
  paper: "#f4eee1",
};

export function ProjectArt({ slug, className }: ProjectArtProps) {
  const isSpeech = slug === "local-speech";
  const isData = slug === "salon-data-platform";
  const isEvents = slug === "event-platform" || slug === "event-ticketing";
  const isSearch = slug === "subsidy-search-pilot" || slug === "ongy-viewer";
  const isAgents = slug === "agent-coordination";

  return (
    <svg
      className={className}
      viewBox="0 0 660 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="660"
        height="400"
        fill={
          isSpeech || isAgents
            ? colors.blue
            : isSearch
              ? colors.red
              : colors.paper
        }
      />
      {isSpeech ? (
        <>
          <path d="M80 400V180a110 110 0 0 1 220 0v220Z" fill={colors.paper} />
          <circle cx="190" cy="180" r="54" fill={colors.blue} />
          <path
            d="M340 208h30v-40h30v120h30V94h30v235h30V140h30v110h30v-48h30"
            fill="none"
            stroke={colors.yellow}
            strokeWidth="16"
          />
          <path
            d="M340 350h65m20 0h90m20 0h65"
            stroke={colors.paper}
            strokeWidth="10"
          />
        </>
      ) : isData ? (
        <>
          <circle cx="150" cy="190" r="125" fill={colors.blue} />
          <path
            d="M150 65v250M25 190h250"
            stroke={colors.paper}
            strokeWidth="3"
          />
          <path d="M300 110h120v200H300Z" fill={colors.red} />
          <path d="M440 400V160a85 85 0 0 1 170 0v240Z" fill={colors.yellow} />
          <path
            d="m320 210 28 28 52-65"
            fill="none"
            stroke={colors.paper}
            strokeWidth="12"
          />
          <path d="M45 350H600" stroke={colors.ink} strokeWidth="2" />
          <path d="M480 340v-60h30v60m20 0V230h30v110" fill={colors.ink} />
        </>
      ) : isEvents ? (
        <>
          <path d="M0 0h330v400H0Z" fill={colors.red} />
          <circle cx="165" cy="200" r="128" fill={colors.blue} />
          <circle cx="165" cy="200" r="65" fill={colors.yellow} />
          <path d="M360 65h200v270H360Z" fill={colors.ink} />
          <path
            d="M360 155h200M360 245h200"
            stroke={colors.paper}
            strokeWidth="3"
          />
          <circle cx="460" cy="155" r="23" fill={colors.paper} />
          <circle cx="460" cy="245" r="23" fill={colors.paper} />
          <path d="M300 200h90" stroke={colors.yellow} strokeWidth="16" />
        </>
      ) : isSearch ? (
        <>
          <path d="M40 400V130a120 120 0 0 1 240 0v270Z" fill={colors.paper} />
          <circle cx="160" cy="150" r="70" fill={colors.yellow} />
          <circle cx="440" cy="170" r="105" fill={colors.blue} />
          <circle cx="440" cy="170" r="61" fill={colors.red} />
          <path d="m515 245 100 100" stroke={colors.blue} strokeWidth="44" />
          <path
            d="M90 290h140m-140 35h95"
            stroke={colors.ink}
            strokeWidth="9"
          />
        </>
      ) : isAgents ? (
        <>
          <circle
            cx="330"
            cy="200"
            r="115"
            fill="none"
            stroke={colors.paper}
            strokeWidth="2"
          />
          <path
            d="M110 200h440M330 55v290"
            stroke={colors.paper}
            strokeWidth="2"
          />
          <circle cx="110" cy="200" r="75" fill={colors.yellow} />
          <path d="M255 345V200a75 75 0 0 1 150 0v145Z" fill={colors.red} />
          <path d="M485 125h150v150H485Z" fill={colors.paper} />
          <circle cx="330" cy="55" r="35" fill={colors.paper} />
        </>
      ) : slug === "markdown-sharing" ? (
        <>
          <path d="M90 45h290v310H90Z" fill={colors.blue} />
          <path
            d="M135 105h195m-195 45h145m-145 45h195m-195 45h110"
            stroke={colors.paper}
            strokeWidth="12"
          />
          <circle cx="460" cy="255" r="115" fill={colors.red} />
          <path
            d="M460 185v70l50 30"
            fill="none"
            stroke={colors.yellow}
            strokeWidth="12"
          />
        </>
      ) : slug === "snap-photobooth" ? (
        <>
          <rect x="50" y="50" width="270" height="300" fill={colors.red} />
          <circle cx="185" cy="180" r="85" fill={colors.paper} />
          <path d="M345 400V170a125 125 0 0 1 250 0v230Z" fill={colors.blue} />
          <circle cx="470" cy="170" r="65" fill={colors.yellow} />
          <path d="M100 295h170" stroke={colors.ink} strokeWidth="12" />
        </>
      ) : slug === "architecture-portfolio" ? (
        <>
          <path d="M60 350V90h190v260Z" fill={colors.blue} />
          <path d="m250 350 145-280 145 280Z" fill={colors.red} />
          <path d="M110 350V205a45 45 0 0 1 90 0v145Z" fill={colors.yellow} />
          <circle cx="480" cy="100" r="65" fill={colors.yellow} />
          <path d="M35 350h590" stroke={colors.ink} strokeWidth="3" />
        </>
      ) : (
        <>
          <path d="M70 60h500v280H70Z" fill={colors.blue} />
          <path d="M70 60h500v60H70Z" fill={colors.ink} />
          <circle cx="100" cy="90" r="9" fill={colors.yellow} />
          <path d="M110 340V230a85 85 0 0 1 170 0v110Z" fill={colors.red} />
          <path
            d="M330 170h190m-190 45h150m-150 45h190"
            stroke={colors.paper}
            strokeWidth="12"
          />
          <circle cx="510" cy="325" r="50" fill={colors.yellow} />
        </>
      )}
    </svg>
  );
}
