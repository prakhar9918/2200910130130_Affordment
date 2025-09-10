import React, { useState } from "react";
import { Grid, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { isValidURL } from "../../utils/validator";
import { Link } from "react-router-dom";
const UrlShortenerForm = ({ urls, setUrls }) => {
  const [formUrls, setFormUrls] = useState([
    { id: 1, longUrl: "", validity: "", shortcode: "", isValid: true, submitted: false, shortUrl: "" }
  ]);

  const MAX_URLS = 5;

  const handleChange = (id, field, value) => {
    setFormUrls(prev =>
      prev.map(url => {
        if (url.id === id) {
          const updated = { ...url, [field]: value };
          if (field === "longUrl") {
            updated.isValid = isValidURL(value) || value === "";
          }
          return updated;
        }
        return url;
      })
    );
  };

  const addUrlRow = () => {
    if (formUrls.length < MAX_URLS) {
      setFormUrls(prev => [
        ...prev,
        {
          id: prev.length > 0 ? Math.max(...prev.map(u => u.id)) + 1 : 1,
          longUrl: "",
          validity: "",
          shortcode: "",
          isValid: true,
          submitted: false,
          shortUrl: ""
        }
      ]);
    }
  };

  const removeUrlRow = (id) => {
    setFormUrls(prev => prev.filter(url => url.id !== id));
  };

  const handleSubmit = (id) => {
    setFormUrls(prev =>
      prev.map(url => {
        if (url.id === id) {
          if (!isValidURL(url.longUrl)) {
            return { ...url, isValid: false, submitted: false };
          }
          const fakeShortUrl = `https://sho.rt/${url.shortcode || Math.random().toString(36).substring(7)}`;

          // Save into global state for Stats Page
          const newEntry = {
            id: Date.now(),
            shortUrl: fakeShortUrl,
            originalUrl: url.longUrl,
            createdAt: new Date().toLocaleString(),
            expiry: new Date(Date.now() + url.validity * 60000).toLocaleString(),
            clicks: 0,
            clickData: []
          };
          setUrls(prev => [...prev, newEntry]);

          return { ...url, submitted: true, isValid: true, shortUrl: fakeShortUrl };
        }
        return url;
      })
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        URL Shortener
      </Typography>
      <Typography variant="subtitle1" textAlign="center" gutterBottom color="text.secondary">
        Shorten up to {MAX_URLS} URLs concurrently.
      </Typography>

      {formUrls.map((url) => (
        <Paper key={url.id} elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            {/* Original URL */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={url.longUrl}
                onChange={(e) => handleChange(url.id, "longUrl", e.target.value)}
                error={!url.isValid && url.longUrl !== ""}
                helperText={!url.isValid && url.longUrl !== "" ? "Enter a valid URL" : ""}
              />
            </Grid>

            {/* Validity */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Validity (minutes)"
                value={url.validity}
                onChange={(e) => handleChange(url.id, "validity", e.target.value)}
              />
            </Grid>

            {/* Shortcode */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={url.shortcode}
                onChange={(e) => handleChange(url.id, "shortcode", e.target.value)}
              />
            </Grid>

            {/* Actions */}
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSubmit(url.id)}
                disabled={!url.longUrl || !url.isValid || url.submitted}
              >
                {url.submitted ? "Submitted!" : "Shorten"}
              </Button>
            </Grid>

            {formUrls.length > 1 && (
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" color="error" fullWidth onClick={() => removeUrlRow(url.id)}>
                  Remove
                </Button>
              </Grid>
            )}

            {url.submitted && url.shortUrl && (
              <Grid item xs={12}>
                <Typography variant="body1">
                  Shortened URL:{" "}
                  <Link to={url.shortUrl} target="_blank" rel="noreferrer">
                    {url.shortUrl}
                  </Link>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      {formUrls.length < MAX_URLS && (
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="success" onClick={addUrlRow}>
            Add Another URL ({MAX_URLS - formUrls.length} remaining)
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UrlShortenerForm;
