import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { format } from 'date-fns';

const RecentActivities = ({ activities }) => {
  return (
    <Timeline position="alternate">
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {index < activities.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" color="textSecondary">
              {format(new Date(activity.timestamp), 'MMM dd, yyyy - hh:mm a')}
            </Typography>
            <Typography variant="body1">
              {activity.userName} {activity.action}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default RecentActivities;