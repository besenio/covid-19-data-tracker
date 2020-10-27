import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './StatsCard.css';

function StatsCard({ title, cases, total, ...props }) {
   return (
      <Card onClick={props.onClick} className="stats-card">
         <CardContent>
            <Typography className="stats-card-title" color="textSecondary">{title}</Typography>

            <h2 className="stats-card-cases">{cases}</h2>

            <Typography className="stats-card-total" color="textSecondary">
               {total} Total
            </Typography>
         </CardContent>
      </Card>
   )
}

export default StatsCard;