// src/app/models/fixture.model.ts
export class Fixture {
    constructor(
      public date: string,
      public teams: string,
      public venue: string
    ) {}
  }
  
  // src/app/models/stadium.model.ts
  export class Stadium {
    constructor(
      public name: string,
      public city: string,
      public capacity: number,
      public imageUrl: string
    ) {}
  }
  