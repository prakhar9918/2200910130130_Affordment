import React from "react";
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Route } from "react-router-dom";
const UrlStatsPage = ({ urls }) => {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        URL Shortener Statistics
      </Typography>

      <Grid container spacing={3}>
        {urls.length === 0 && (
          <Typography variant="body1" textAlign="center" sx={{ mt: 3, width: "100%" }}>
            No shortened URLs yet. Please create some first.
          </Typography>
        )}

        {urls.map((url) => (
          <Grid item xs={12} key={url.id}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">
                <Link to={url.shortUrl}>{window.location.origin + url.shortUrl}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Original: {url.originalUrl}
              </Typography>
              <Typography variant="body2">
                Created: {url.createdAt} | Expires: {url.expiry}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Total Clicks:</strong> {url.clicks}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Click Details
              </Typography>
              {url.clickData.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No clicks yet.
                </Typography>
              ) : (
                <List dense>
                  {url.clickData.map((click, idx) => (
                    <ListItem key={idx} sx={{ display: "block" }}>
                      <ListItemText
                        primary={`Timestamp: ${click.timestamp}`}
                        secondary={`Source: ${click.source} | Location: ${click.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UrlStatsPage;
