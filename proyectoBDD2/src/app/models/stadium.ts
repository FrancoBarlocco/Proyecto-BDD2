  export class Stadium {
    stadiumId : number;
    Name: string;
    City: string;
    Capacity: number;
    Image: string;

  constructor(stadiumId: number, name: string, city: string, capacity: number, image: string){
    this.stadiumId = stadiumId
    this.Name = name;
    this.City = city,
    this.Capacity = capacity,
    this.Image = image
  }

  }