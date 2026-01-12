import { colors } from "../types/colors";

export function getColors(idLabel: number) {
  
    return colors[idLabel % colors.length];
}