export function transformDate(date: string, shorted?: boolean) {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return shorted ? years + "A" : "Il y a " + years + ` an${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return shorted ? months + "M" : "Il y a " + months + ` mois`;
    } else if (weeks > 0) {
      return shorted ? weeks + "S" : "Il y a " + weeks + ` semaine${weeks > 1 ? "s" : ""}`;
    } else if (days > 0) {
      return shorted ? days + "J" : "Il y a " + days + ` jour${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return shorted ? hours + "H" : "Il y a " + hours + ` heure${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes < 2 ? "A l'instant" : shorted ? `${minutes} min` : `Il y a ${minutes} minutes`}`;
    }
}