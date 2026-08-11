import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

// Resolved against import.meta.url (this remote's own origin) instead of a plain
// import, so the URLs still work once this component is rendered inside host-shell's page.
const athenaImg = new URL('./assets/team1/team1_Athena.jpeg', import.meta.url).href;
const odysseusImg = new URL('./assets/team1/team1_Odysseus.webp', import.meta.url).href;
const penelopeImg = new URL('./assets/team1/team1_Penelope.jpeg', import.meta.url).href;
const telemachusImg = new URL('./assets/team1/team1_Telemachus.webp', import.meta.url).href;

const haalandImg = new URL('./assets/team2/team2_Erling_Braut_Haaland.jpeg', import.meta.url).href;
const mbappeImg = new URL('./assets/team2/team2_Kylian_Mbappe.jpeg', import.meta.url).href;
const yamalImg = new URL('./assets/team2/team2_Lamine_Yamal.jpg', import.meta.url).href;

// Switch which roster is shown: 'team1' or 'team2'
const ACTIVE_TEAM: 'team1' | 'team2' = 'team2';

interface TeamMember {
  name: string;
  role: string;
  emoji: string;
  photo: string;
}

const TEAMS: Record<'team1' | 'team2', TeamMember[]> = {
  team1: [
    { name: 'Athena', role: 'Business Analyst', emoji: '🦉', photo: athenaImg },
    { name: 'Odysseus', role: 'Senior Backend Voyager', emoji: '🚢', photo: odysseusImg },
    { name: 'Penelope', role: 'QA Lead', emoji: '🧵', photo: penelopeImg },
    { name: 'Telemachus', role: 'Junior Software Engineer', emoji: '🏹', photo: telemachusImg },
  ],
  team2: [
    { name: 'Erling Haaland', role: 'Goal-Scoring Machine, DevOps', emoji: '⚽', photo: haalandImg },
    { name: 'Kylian Mbappé', role: 'Frontend Speedster', emoji: '⚡', photo: mbappeImg },
    { name: 'Lamine Yamal', role: 'Junior Dev Prodigy', emoji: '🌟', photo: yamalImg },
  ],
};

export default function TeamJoin() {
  const members = TEAMS[ACTIVE_TEAM];

  const gridRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const [rowHeight, setRowHeight] = useState<number | undefined>(undefined);

  // Row height must equal the shortest photo once every image is scaled to
  // the same column width, so taller photos get cropped vertically instead
  // of the whole row stretching to the tallest one.
  const recalcRowHeight = useCallback(() => {
    const container = gridRef.current;
    if (!container || members.length === 0) return;

    const columnWidth = container.clientWidth / members.length;
    const heights: number[] = [];

    for (const m of members) {
      const img = imgRefs.current[m.name];
      if (!img?.naturalWidth || !img.naturalHeight) return;
      heights.push(columnWidth * (img.naturalHeight / img.naturalWidth));
    }

    setRowHeight(Math.min(...heights));
  }, [members]);

  useEffect(() => {
    recalcRowHeight();

    const container = gridRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => recalcRowHeight());
    observer.observe(container);
    return () => observer.disconnect();
  }, [recalcRowHeight]);

  return (
    <div style={{ fontFamily: "'Source Sans Pro', sans-serif"}}>
      <h3 style={{ color: '#57B12D', margin: '0 0 10px 0', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>👥 Look Who Joined Our Team!</h3>

      <ul style={listStyle}>
        {members.map((m) => (
          <li key={m.name} style={{ margin: '4px 0' }}>
            {m.emoji} <strong>{m.name}</strong> — {m.role}
          </li>
        ))}
      </ul>

      <div ref={gridRef} style={{ ...photoGridStyle, height: rowHeight ? `${rowHeight}px` : 'auto' }}>
        {members.map((m) => (
          <img
            key={m.name}
            ref={(el) => { imgRefs.current[m.name] = el; }}
            src={m.photo}
            alt={m.name}
            style={photoStyle}
            onLoad={recalcRowHeight}
          />
        ))}
      </div>
    </div>
  );
}

const listStyle: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 14px 0',
  fontSize: '14px',
  color: '#c9d1d9',
};

const photoGridStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 0,
  overflow: 'hidden',
};

const photoStyle: CSSProperties = {
  flex: '1 1 0',
  minWidth: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};
