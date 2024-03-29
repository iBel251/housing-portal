import React, { useEffect, useState } from "react";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import useMainStore from "../store/mainStore";

// Define all your styles in the styles object
const styles = {
  card: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    cursor: "pointer",
    position: "relative", // Make sure the card has relative positioning
  },
  media: {
    height: 140,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginLeft: "5px",
  },
  favoriteIcon: {
    position: "absolute",
    top: "0px",
    right: "0px",
    zIndex: 2,
    background: "white",
    borderTopRightRadius: "3px",
  },
};

const HouseCard = ({ house, onHouseClick }) => {
  const storedUserData = useMainStore((state) => state.userData);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    if (house?.status === "blocked" || house?.status === "unlisted") {
      setIsBanned(true);
    }
  }, []);

  const handleClick = () => {
    onHouseClick(house.id);
  };

  return (
    <Box style={{ position: "relative" }}>
      {" "}
      {/* Ensure Box has relative positioning */}
      <Box onClick={handleClick} style={{ textDecoration: "none" }}>
        <MuiCard style={styles.card}>
          <CardMedia
            style={styles.media}
            component="img"
            image={house.pic1}
            alt={house.subcity}
          />
          {isBanned ? (
            <CardContent>
              This house have been banned from public display.
              <Typography
                sx={{
                  background: "orange",
                  width: "fit-content",
                  p: "5px",
                  marginLeft: "auto",
                  borderRadius: "3px",
                }}
              >
                Detail
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    <span style={styles.infoLabel}>Subcity:</span>
                    <span style={styles.infoValue}>{house.subcity}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span style={styles.infoLabel}>Rooms:</span>
                    <span style={styles.infoValue}>{house.rooms}</span>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <span style={styles.infoLabel}>Price:</span>
                    <span style={styles.infoValue}>{house.price} Birr</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span style={styles.infoLabel}>Bathrooms:</span>
                    <span style={styles.infoValue}>{house.bathroom}</span>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </MuiCard>
      </Box>
    </Box>
  );
};

export default HouseCard;
