import type { CSSProperties } from 'react';

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
const ACTIVE_TEAM: 'team1' | 'team2' = 'team1';

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

  return (
    <div style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      <h3 style={{ color: '#57B12D', margin: '0 0 10px 0', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>👥 Look Who Joined Our Team!</h3>

      <ul style={listStyle}>
        {members.map((m) => (
          <li key={m.name} style={{ margin: '4px 0' }}>
            {m.emoji} <strong>{m.name}</strong> — {m.role}
          </li>
        ))}
      </ul>

      <div style={photoGridStyle}>
        {members.map((m) => (
          <img key={m.name} src={m.photo} alt={m.name} style={photoStyle} />
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
  gap: 0,
  height: '160px',
};

const photoStyle: CSSProperties = {
  height: '100%',
  width: 'auto',
  objectFit: 'cover',
};
