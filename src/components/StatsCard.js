import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './StatsCard.css';

function StatsCard({ isRed, active, title, cases, total, ...props }) {
   return (
      <Card 
         onClick={props.onClick} 
         className={`stats-card ${active && 'stats-card--selected'} ${isRed && 'stats-card--red'}`}
      >
         <CardContent>
            <Typography className="stats-card-title" color="textSecondary">{title}</Typography>

            <h2 className={`stats-card-cases ${!isRed && 'stats-card-cases--green'}`}>{cases}</h2>

            <Typography className="stats-card-total" color="textSecondary">
               {total} Total
            </Typography>
         </CardContent>
      </Card>
   )
}

export default StatsCard;