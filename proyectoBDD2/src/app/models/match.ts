// match.model.ts
export class Match {
  constructor(
    public id: number,
    public location: string,
    public date: string,
    public team1: number,
    public team2: number,
    public team1Badge: string, // Ruta de la imagen del escudo del equipo 1
    public team2Badge: string  // Ruta de la imagen del escudo del equipo 2
  ) {}
}
