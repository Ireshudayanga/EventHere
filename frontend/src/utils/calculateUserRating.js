// utils/calculateUserRating.js

export function calculateUserRating({ reviews = [], activityScore = 0, profileCompleted = false }) {
    const maxStars = 10;
  
    const reviewAvg = reviews.length
      ? reviews.reduce((acc, val) => acc + val, 0) / reviews.length
      : 0;
  
    const reviewWeight = 0.6;
    const activityWeight = 0.3;
    const profileBonus = profileCompleted ? 1 : 0;
  
    const rating = (
      (reviewAvg * 2 * reviewWeight) +
      (activityScore * activityWeight) +
      profileBonus
    );
  
    return Math.min(maxStars, Math.round(rating * 10) / 10);
  }
  