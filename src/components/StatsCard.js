import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'

function StatsCard({ title, cases, total }) {
   return (
      <Card className="stats-card">
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