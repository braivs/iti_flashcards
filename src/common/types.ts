export type Direction = 'asc' | 'desc'
export type FieldType = 'name' | 'cardsCount' | 'updated' | 'created'
export type OrderByType = `${FieldType}-${Direction}`
export type SelectedDeckType = {
  id: string
  name: string
}
