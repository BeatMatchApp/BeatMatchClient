import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent } from '@mui/material';
import { Playlist } from '../../models/Playlist';
import { StyledPageSubtitle } from '../styledComponents';
import { MOOD_COLORS } from '../../shared/consts';

interface Props {
  playlists: Pick<Playlist, 'id' | 'mood'>[];
}

const MoodPlaylistsChart: React.FC<Props> = ({ playlists }) => {
  const initialCounts: Record<string, number> = {};

  const moodCounts = playlists.reduce((counts, { mood }) => {
    counts[mood] = (counts[mood] ?? 0) + 1;
    return counts;
  }, initialCounts);

  const data = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
  }));
  return (
    <Card className="p-4 shadow-xl rounded-2xl">
      <CardContent>
        <StyledPageSubtitle>Welcome to your mood board!</StyledPageSubtitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="mood" style={{ fontSize: 14 }} />
            <YAxis allowDecimals={false} style={{ fontSize: 14 }} />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={MOOD_COLORS[entry.mood] || MOOD_COLORS.default}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MoodPlaylistsChart;
