

export interface Trips{
    id:number
    name:string
    destiny:string
    startDate:string
    endDate:string
    pricePerPerson:number
    maxPeople:number
    booked: number
    description:string
    img:string
    link:string
    rating:number

}

export interface Opinion{
    nick:string
    tripName:string
    opinionContent:string
    purchaseDate:string
}
