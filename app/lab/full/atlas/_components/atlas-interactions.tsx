"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./atlas.module.css";

export type AtlasLocale = "en" | "ja";

export function AtlasLanguageLink({
  href,
  locale,
  isCurrent,
  children,
}: {
  href: string;
  locale: AtlasLocale;
  isCurrent: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      hrefLang={locale}
      lang={locale}
      aria-current={isCurrent ? "true" : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        const destination = new URL(href, window.location.origin);
        const currentLocation = new URL(window.location.href);
        for (const name of ["area", "project"]) {
          const value = currentLocation.searchParams.get(name);
          if (value) destination.searchParams.set(name, value);
        }
        router.push(
          `${destination.pathname}${destination.search}${currentLocation.hash}`,
        );
      }}
    >
      {children}
    </Link>
  );
}

type BuildingProject = {
  slug: string;
  title: string;
  summary: string;
  room: string;
  href: string;
};

export function AtlasCollectionMemory({ locale }: { locale: AtlasLocale }) {
  useEffect(() => {
    const location = `${window.location.pathname}${window.location.search}`;
    const storageKey = `atlas:collection:${locale}:${location}`;
    let animationFrame = 0;

    const savePosition = () => {
      try {
        sessionStorage.setItem(storageKey, String(window.scrollY));
      } catch {
        return;
      }
    };
    const scheduleSave = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(savePosition);
    };

    try {
      const savedPosition = Number(sessionStorage.getItem(storageKey));
      if (Number.isFinite(savedPosition) && savedPosition > 0)
        requestAnimationFrame(() => window.scrollTo(0, savedPosition));
    } catch {}

    window.addEventListener("scroll", scheduleSave, { passive: true });
    document.addEventListener("click", savePosition, true);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleSave);
      document.removeEventListener("click", savePosition, true);
    };
  }, [locale]);

  return null;
}

export function RoomDrawing({ variant = 0 }: { variant?: number }) {
  return (
    <svg
      viewBox="0 0 300 154"
      fill="none"
      aria-hidden="true"
      className={styles.roomDrawing}
    >
      <path d="M8 8H292V146H8V8Z" stroke="currentColor" strokeWidth="3" />
      <path
        d="M102 8V65M102 89V146M102 77H185M209 77H292M197 8V77"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M102 65A24 24 0 0 1 126 89M185 77A24 24 0 0 1 209 101"
        stroke="currentColor"
        strokeWidth="1"
      />
      {variant % 3 === 0 ? (
        <>
          <rect
            x="27"
            y="30"
            width="54"
            height="94"
            fill="currentColor"
            opacity=".13"
          />
          {[44, 65, 86, 107].map((y) => (
            <path
              key={y}
              d={`M37 ${y}H71`}
              stroke="currentColor"
              strokeWidth="3"
            />
          ))}
          <circle
            cx="149"
            cy="40"
            r="17"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M124 107H266M124 122H225"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="217"
            y="26"
            width="52"
            height="27"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      ) : variant % 3 === 1 ? (
        <>
          {[38, 62, 86].map((x) => (
            <path
              key={x}
              d={`M${x} 45V108`}
              stroke="currentColor"
              strokeWidth={x === 62 ? 8 : 3}
            />
          ))}
          <rect
            x="126"
            y="26"
            width="46"
            height="28"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="244"
            cy="40"
            r="17"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M125 111H145L153 97L161 123L170 104H269"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          {[37, 62, 87].map((y) => (
            <rect
              key={y}
              x="29"
              y={y}
              width="48"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
          <path d="M122 28H174V56H122Z" fill="currentColor" opacity=".15" />
          <path d="M216 28H274V56H216Z" stroke="currentColor" strokeWidth="2" />
          {[138, 172, 206, 240].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="111"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </>
      )}
    </svg>
  );
}

export function ProjectBuilding({
  projects,
  locale,
}: {
  projects: BuildingProject[];
  locale: AtlasLocale;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = projects[selectedIndex];

  return (
    <div className={styles.buildingExhibit}>
      <div className={styles.buildingViewport}>
        <div className={styles.building} data-expanded={isExpanded}>
          <div className={styles.siteGrid} aria-hidden="true" />
          {projects.map((project, index) => (
            <button
              key={project.slug}
              className={styles.floor}
              style={{ "--floor": index } as CSSProperties}
              data-selected={selectedIndex === index}
              aria-pressed={selectedIndex === index}
              aria-label={project.title}
              onClick={() => setSelectedIndex(index)}
            >
              <span className={styles.floorName}>{project.room}</span>
              <RoomDrawing variant={index} />
              <span className={styles.floorWall} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.buildingControls}>
        <button
          className={styles.outlineButton}
          aria-pressed={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span
            className={styles.liftIcon}
            data-expanded={isExpanded}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </span>
          {locale === "en"
            ? isExpanded
              ? "Stack the floors"
              : "Lift the floors"
            : isExpanded
              ? "フロアを重ねる"
              : "フロアを広げる"}
        </button>
        <p>
          {locale === "en"
            ? "Choose a floor to explore a project."
            : "フロアを選んで、プロジェクトを見てみる。"}
        </p>
      </div>
      <div className={styles.buildingReadout} aria-live="polite">
        <div>
          <span className={styles.smallText}>{selectedProject.room}</span>
          <h2>
            <Link href={selectedProject.href}>{selectedProject.title}</Link>
          </h2>
        </div>
        <p>{selectedProject.summary}</p>
        <Link className={styles.textLink} href={selectedProject.href}>
          {locale === "en" ? "Read the case study" : "事例を読む"}
        </Link>
      </div>
    </div>
  );
}

function wrapTitle(value: string, locale: AtlasLocale) {
  if (locale === "ja") return value.match(/.{1,13}/gu) ?? [value];
  return value.split(" ").reduce<string[]>((lines, word) => {
    const currentLine = lines.at(-1);
    if (currentLine && `${currentLine} ${word}`.length <= 22)
      lines[lines.length - 1] = `${currentLine} ${word}`;
    else lines.push(word);
    return lines;
  }, []);
}

export type SystemRoom = { title: string; description: string };

export function SystemPlan({
  rooms,
  locale,
  id,
}: {
  rooms: SystemRoom[];
  locale: AtlasLocale;
  id: string;
}) {
  const [selectedRoom, setSelectedRoom] = useState(0);

  return (
    <div className={styles.systemExhibit} id="system-plan">
      <div className={styles.planSheet}>
        <svg
          viewBox="0 0 720 390"
          fill="none"
          role="img"
          aria-labelledby={`${id}-plan-title ${id}-plan-description`}
        >
          <title id={`${id}-plan-title`}>
            {locale === "en"
              ? "A floor plan of the system"
              : "システムの構成図"}
          </title>
          <desc id={`${id}-plan-description`}>
            {rooms
              .map((room) => `${room.title}: ${room.description}`)
              .join(" ")}
          </desc>
          <defs>
            <pattern
              id={`${id}-grid`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path d="M24 0H0V24" stroke="currentColor" strokeOpacity=".08" />
            </pattern>
          </defs>
          <rect width="720" height="390" fill={`url(#${id}-grid)`} />
          <path d="M60 66H660V324H60Z" stroke="currentColor" strokeWidth="4" />
          {rooms.slice(0, 3).map((room, index) => (
            <g
              key={room.title}
              className={styles.planRoom}
              data-active={selectedRoom === index}
            >
              <rect
                x={72 + index * 200}
                y="78"
                width="176"
                height="234"
                fill={
                  index === 1 ? "#efc7b5" : index === 2 ? "#e7ecdb" : "#d2ddfc"
                }
                fillOpacity={selectedRoom === index ? 1 : 0.35}
              />
              <path
                d={`M${90 + index * 200} 108h140`}
                stroke="currentColor"
                strokeWidth="2"
              />
              <text
                x={160 + index * 200}
                y="132"
                textAnchor="middle"
                fill="currentColor"
                fontSize="13"
              >
                {wrapTitle(room.title, locale).map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={160 + index * 200}
                    dy={lineIndex === 0 ? 0 : 17}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
              {index === 0 ? (
                <>
                  <rect
                    x="115"
                    y="177"
                    width="90"
                    height="91"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M130 197H190M130 213H178M130 229H185M130 245H165"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </>
              ) : index === 1 ? (
                <>
                  <circle
                    cx="360"
                    cy="218"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M336 218L353 235L384 199"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </>
              ) : (
                <>
                  <rect
                    x="514"
                    y="178"
                    width="92"
                    height="81"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M527 241V218M547 241V205M567 241V214M587 241V193M538 273H582"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </>
              )}
            </g>
          ))}
          <path
            d="M260 66V178M260 230V324M460 66V178M460 230V324"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M260 178A52 52 0 0 1 312 230M460 178A52 52 0 0 1 512 230"
            stroke="currentColor"
          />
          <path
            d="M60 42H660M60 34V50M260 34V50M460 34V50M660 34V50"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <path
            d="M60 349H660M60 341V357M660 341V357"
            stroke="currentColor"
            strokeOpacity=".5"
          />
        </svg>
      </div>
      <div className={styles.roomInspector}>
        <div
          className={styles.roomControls}
          aria-label={
            locale === "en" ? "Inspect a system stage" : "処理の段階を選ぶ"
          }
        >
          {rooms.map((room, index) => (
            <button
              key={room.title}
              aria-pressed={selectedRoom === index}
              aria-controls={`${id}-room-detail`}
              onClick={() => setSelectedRoom(index)}
            >
              {room.title}
            </button>
          ))}
        </div>
        <div
          id={`${id}-room-detail`}
          className={styles.roomDetail}
          aria-live="polite"
        >
          <h3>{rooms[selectedRoom].title}</h3>
          <p>{rooms[selectedRoom].description}</p>
        </div>
      </div>
    </div>
  );
}
